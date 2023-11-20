class StatusError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const SERVER_HOST = import.meta.env['VITE_SERVER_HOST'] || 'http://localhost';
const SERVER_PORT = import.meta.env['VITE_SERVER_PORT'] || 8080;

/**
 * Read All Note
 *
 * @returns {Promise<Array>}
 * @throws {StatusError}
 */
export const readAllNotes = async () => {
  const response = await fetch(`${SERVER_HOST}:${SERVER_PORT}/api/notes?versions=${false}`, {
    method: 'GET'
  });

  if (response.ok) return await response.json();
  throw new StatusError(response.statusText, response.status);
};

/**
 * Create New Note
 *
 * @param {*} { shortText, longText }
 * @returns {Promise}
 * @throws {StatusError}
 */
export const createNote = async ({ shortText, longText }) => {
  const response = await fetch(`${SERVER_HOST}:${SERVER_PORT}/api/notes`, {
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ shortText, longText }),
    method: 'POST'
  });

  if (response.ok) return await response.json();
  throw new StatusError(response.statusText, response.status);
};

/**
 * Create New Version
 *
 * @param {string} id Note ID
 * @param {*} { shortText, longText }
 * @returns {Promise}
 * @throws {StatusError}
 */
export const createVersion = async (id, { shortText, longText }) => {
  const response = await fetch(`${SERVER_HOST}:${SERVER_PORT}/api/notes/version`, {
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ noteId: id, shortText, longText }),
    method: 'POST'
  });

  if (response.ok) return await response.json();
  throw new StatusError(response.statusText, response.status);
};

/**
 * Read Note
 *
 * @param {string} id Note ID
 * @returns {Promise} Note
 * @throws {StatusError}
 */
export const readNote = async id => {
  const response = await fetch(`${SERVER_HOST}:${SERVER_PORT}/api/notes/${id}`, {
    method: 'GET'
  });

  if (response.ok) return await response.json();
  throw new StatusError(response.statusText, response.status);
};

/**
 * Update Note
 *
 * @param {*} id Note ID
 * @param {*} { currentVersion, shortText, longText, bgColor }
 * @returns {Promise} 204
 * @throws {StatusError}
 */
export const updateNote = async (id, { currentVersion, shortText, longText, bgColor }) => {
  const response = await fetch(`${SERVER_HOST}:${SERVER_PORT}/api/notes/${id}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ currentVersion, shortText, longText, bgColor }),
    method: 'PATCH'
  });

  if (response.ok && response.status === 204) return '';
  throw new StatusError(response.statusText, response.status);
};

/**
 * Delete Note
 *
 * @param {string} id Note ID
 * @returns {Promise} 204
 * @throws {StatusError}
 */
export const deleteNote = async id => {
  const response = await fetch(`${SERVER_HOST}:${SERVER_PORT}/api/notes/${id}`, {
    method: 'DELETE'
  });

  if (response.ok && response.status === 204) return '';
  throw new StatusError(response.statusText, response.status);
};
