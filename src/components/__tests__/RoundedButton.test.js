import { fireEvent, render, screen } from '@testing-library/vue';
import { describe, expect, test } from 'vitest';
import RoundedButton from '../RoundedButton.vue';
import { vi } from 'vitest';

describe('<RoundedButton />', () => {
  test('Should Renders', () => {
    render(RoundedButton, {
      slots: {
        default: '<span>+</span>'
      }
    });

    expect(screen.getByText('+')).toBeInTheDocument();
  });

  test('Should Emit Click Event', async () => {
    const { emitted } = render(RoundedButton);

    const button = screen.getByLabelText('Unknown');
    await fireEvent.click(button);

    expect(emitted()).toHaveProperty('click');
  });

  test('Should Triggers Click Event', async () => {
    const onClickMock = vi.fn();

    render(RoundedButton, {
      props: {
        onClick: onClickMock
      }
    });

    const button = screen.getByLabelText('Unknown');
    await fireEvent.click(button);

    expect(onClickMock).toHaveBeenCalled();
  });
});
