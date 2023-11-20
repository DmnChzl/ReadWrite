import { render, screen } from '@testing-library/vue';
import { describe, expect, test } from 'vitest';
import StyledDiv from '../StyledDiv.vue';

describe('<StyledDiv />', () => {
  test('Should Renders', async () => {
    render(StyledDiv, {
      slots: {
        default: '<span>Styled Span</span>'
      }
    });

    expect(screen.getByText('Styled Span')).toBeInTheDocument();
  });
});
