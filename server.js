/* eslint-disable */
import 'dotenv/config';
import Fastify from 'fastify';

const server = Fastify({ logger: true });

const LIGHT = 'light';

const DEFAULT_NOTES = [
  {
    id: '70vduktsj3e',
    versions: [
      {
        id: 'iff21lz96mo',
        shortText: 'Lorem Ipsum',
        longText: 'Lorem ipsum dolor sit amet...',
        createdAt: 1698836400 * 1000,
        updatedAt: 1698922800 * 1000
      },
      {
        id: '537zc6a7vvg',
        shortText: 'Lorem Ipsum',
        longText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id est ac dui finibus aliquam.',
        createdAt: 1699009200 * 1000,
        updatedAt: 1699009200 * 1000
      }
    ],
    currentVersion: '537zc6a7vvg',
    bgColor: 'red'
  },
  {
    id: '9f1fd2ws18o',
    versions: [
      {
        id: '5ehkqmc7ea',
        shortText: 'Nam Bibendum',
        longText:
          'Nam bibendum, sapien vel commodo consectetur, diam justo lacinia lacus, a feugiat quam augue ut felis.',
        createdAt: 1699095600 * 1000,
        updatedAt: 1699182000 * 1000
      }
    ],
    currentVersion: '5ehkqmc7ea',
    bgColor: 'amber'
  },
  {
    id: 'v3tu8azdz0d',
    versions: [
      {
        id: '3ia2rj60toc',
        shortText: 'Nunc Non',
        longText: 'Nunc non velit a quam pharetra mollis non eget metus. Phasellus pellentesque dignissim posuere.',
        createdAt: 1699268400 * 1000,
        updatedAt: 1699268400 * 1000
      }
    ],
    currentVersion: '3ia2rj60toc',
    bgColor: 'lime'
  },
  {
    id: '7go0pfsvo43',
    versions: [
      {
        id: 'rdj2kanqnb',
        shortText: 'Nam Neque',
        longText:
          'Nam neque libero, efficitur a sapien venenatis, maximus rhoncus nibh. Nulla aliquam consectetur ante non bibendum.',
        createdAt: 1699354800 * 1000,
        updatedAt: 1699354800 * 1000
      }
    ],
    currentVersion: 'rdj2kanqnb',
    bgColor: 'emerald'
  },
  {
    id: 'taj52ivfp2',
    versions: [
      {
        id: 's9ll854bb3h',
        shortText: 'Nunc blandit',
        longText: 'Nunc blandit neque quis tortor tincidunt consequat.',
        createdAt: 1699441200 * 1000,
        updatedAt: 1699441200 * 1000
      },
      {
        id: 'b8spkl0c27',
        shortText: 'Etiam Elementum',
        longText:
          'Etiam elementum lacus a enim dignissim efficitur. Sed mauris massa, facilisis vel nisi sit amet, eleifend egestas orci.',
        createdAt: 1699527600 * 1000,
        updatedAt: 1699614000 * 1000
      }
    ],
    currentVersion: 'b8spkl0c27',
    bgColor: 'cyan'
  },
  {
    id: 'o657y8dn0a',
    versions: [
      {
        id: '13e0cr3n1j2',
        shortText: 'Cras Auctor',
        longText:
          'Cras auctor nisl sed risus molestie, a sollicitudin lorem porta. In eleifend tempus nulla, non sollicitudin orci euismod ut.',
        createdAt: 1699700400 * 1000,
        updatedAt: 1699700400 * 1000
      }
    ],
    currentVersion: '13e0cr3n1j2',
    bgColor: 'blue'
  }
];

let ALL_NOTES = [...DEFAULT_NOTES];

const getRandomString = () => Math.random().toString(36).substring(2);

server.addHook('onRequest', async (_, reply) => {
  // CORS
  reply.header('Access-Control-Allow-Origin', '*');
  reply.header('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE');
  reply.header('Access-Control-Allow-Headers', 'Content-Type');
});

/**
 * Get Many Notes
 */
server.get('/api/notes', async (request, reply) => {
  const queryVersions = request.query.versions === 'true';

  return reply.code(200).send(
    ALL_NOTES.map(({ versions, currentVersion, ...n }) => ({
      ...n,
      versions: !queryVersions ? versions.reduce(count => (count += 1), 0) : versions,
      currentVersion: !queryVersions ? versions.find(v => v.id === currentVersion) : currentVersion
    }))
  );
});

/**
 * Create New Note
 */
server.post('/api/notes', async (request, reply) => {
  const { shortText, longText } = request.body;

  // BAD REQUEST
  if (shortText === undefined || longText === undefined) {
    return reply.code(400).send();
  }

  const noteId = getRandomString();
  const versionId = getRandomString();
  const now = Date.now();

  const newNote = {
    id: noteId,
    versions: [
      {
        id: versionId,
        shortText,
        longText,
        createdAt: now,
        updatedAt: now
      }
    ],
    currentVersion: versionId,
    bgColor: LIGHT
  };

  ALL_NOTES = [...ALL_NOTES, newNote];

  return reply.code(201).send({
    id: newNote.id,
    currentVersion: newNote.versions.find(v => v.id === newNote.currentVersion),
    bgColor: newNote.bgColor
  });
});

/**
 * Create New Version
 */
server.post('/api/notes/version', async (request, reply) => {
  const { noteId, shortText, longText } = request.body;

  // BAD REQUEST
  if (!noteId || shortText === undefined || longText === undefined) {
    return reply.code(400).send();
  }

  const note = ALL_NOTES.find(n => n.id === noteId);

  // NOT FOUND
  if (!note) return reply.code(404).send();

  const versionIndex = note.versions.findIndex(v => v.id === note.currentVersion);

  // Deletion of versions prior to the version currently being created...
  if (versionIndex < note.versions.length - 1) {
    note.versions.length = versionIndex + 1;
  }

  const versionId = getRandomString();
  const now = Date.now();

  const newVersion = {
    id: versionId,
    shortText,
    longText,
    createdAt: now,
    updatedAt: now
  };

  ALL_NOTES = ALL_NOTES.map(n => {
    if (n.id === noteId) {
      return {
        ...n,
        versions: [...n.versions, newVersion],
        currentVersion: versionId
      };
    }

    return n;
  });

  return reply.code(201).send({
    id: newVersion.id,
    shortText: newVersion.shortText,
    longText: newVersion.longText,
    createdAt: newVersion.createdAt
  });
});

/**
 * Get One Note
 */
server.get('/api/notes/:id', async (request, reply) => {
  const { id } = request.params;

  // BAD REQUEST
  if (!id) return reply.code(400).send();

  const note = ALL_NOTES.find(n => n.id === id);

  if (!note) return reply.code(404).send();

  return reply.code(200).send(note);
});

/**
 * Update Existing Note
 */
server.patch('/api/notes/:id', async (request, reply) => {
  const { id } = request.params;
  const { currentVersion, shortText, longText, bgColor } = request.body;

  // BAD REQUEST
  if (id === undefined) {
    return reply.code(400).send();
  }

  const note = ALL_NOTES.find(n => n.id === id);

  // NOT FOUND
  if (note === undefined) {
    return reply.code(404).send();
  }

  if (shortText || longText) {
    const versionIndex = note.versions.findIndex(v => v.id === note.currentVersion);

    // Deletion of versions prior to the version currently being edited...
    if (versionIndex < note.versions.length - 1) {
      note.versions.length = versionIndex + 1;
    }
  }

  // TODO: Re-Use 'versionIndex' Rather Than 'find()'
  const version = note.versions.find(v => v.id === note.currentVersion);
  const now = Date.now();

  ALL_NOTES = ALL_NOTES.map(n => {
    if (n.id === id) {
      return {
        ...n,
        versions: n.versions.map(v => {
          if (v.id === version.id) {
            return {
              ...v,
              shortText: shortText || version.shortText,
              longText: longText || version.longText,
              updatedAt: now
            };
          }

          return v;
        }),
        currentVersion: currentVersion || n.currentVersion,
        bgColor: bgColor || n.bgColor
      };
    }

    return n;
  });

  return reply.code(204).send();
});

/**
 * Delete Existing Note
 */
server.delete('/api/notes/:id', async (request, reply) => {
  const { id } = request.params;

  // BAD REQUEST
  if (!id) return reply.code(400).send();

  ALL_NOTES = ALL_NOTES.filter(n => n.id !== id);
  return reply.code(204).send();
});

// PREFLIGHT
server.options('/api/notes*', async (_, reply) => {
  reply.header('Content-Length', '0');
  return reply.status(204).send();
});

const HOST = process.env['HOST'] || '127.0.0.1';
const PORT = +process.env['PORT'] || 8080;

try {
  await server.listen({ host: HOST, port: PORT });
  server.log.info("Server Runnin'...");
} catch (err) {
  server.log.error(err);
  process.exit(1);
}
