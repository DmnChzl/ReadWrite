import { fireEvent, render, screen } from '@testing-library/vue';
import { describe, expect, test } from 'vitest';
import FloatingActionButton from '../FloatingActionButton.vue';
import { vi } from 'vitest';

describe('<FloatingActionButton />', () => {
  test('Should Emit Click Event', async () => {
    const { emitted } = render(FloatingActionButton);

    const fabButton = screen.getByLabelText('FAB');
    await fireEvent.click(fabButton);

    expect(emitted()).toHaveProperty('click');
  });

  test('Should Triggers Click Event', async () => {
    const onClickMock = vi.fn();

    render(FloatingActionButton, {
      props: {
        onClick: onClickMock
      }
    });

    const fabButton = screen.getByLabelText('FAB');
    await fireEvent.click(fabButton);

    expect(onClickMock).toHaveBeenCalled();
  });
});
