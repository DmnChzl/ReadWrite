import { render, screen } from '@testing-library/vue';
import { describe, expect, test } from 'vitest';
import ListItem from '../ListItem.vue';

describe('<ListItem />', () => {
  test('Should Renders With Props', async () => {
    render(ListItem, {
      props: {
        title: 'Short Text',
        subTitle: 'Looonnng Teeexxxt'
      }
    });

    expect(screen.getByText('Short Text')).toBeInTheDocument();
    expect(screen.getByText('Looonnng Teeexxxt')).toBeInTheDocument();
  });
});
