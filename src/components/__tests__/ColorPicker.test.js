import { fireEvent, render, screen } from '@testing-library/vue';
import { describe, expect, test } from 'vitest';
import ColorPicker from '../ColorPicker.vue';
import { vi } from 'vitest';

describe('<ColorPicker />', () => {
  test('Should Emit Pick Event', async () => {
    const { emitted } = render(ColorPicker);

    const lightBtn = screen.getByLabelText('LIGHT');
    await fireEvent.click(lightBtn);

    expect(emitted()).toHaveProperty('pick');
  });

  test('Should Emit Event Returns Values', async () => {
    const { emitted } = render(ColorPicker);

    const redBtn = screen.getByLabelText('RED');
    await fireEvent.click(redBtn);

    const greenBtn = screen.getByLabelText('GREEN');
    await fireEvent.click(greenBtn);

    const blueBtn = screen.getByLabelText('BLUE');
    await fireEvent.click(blueBtn);

    const [[redValue], [greenValue], [blueValue]] = emitted()['pick'];

    expect(redValue).toEqual('red');
    expect(greenValue).toEqual('green');
    expect(blueValue).toEqual('blue');
  });

  test('Should Triggers Pick Event x3', async () => {
    const onPickMock = vi.fn();

    render(ColorPicker, {
      props: {
        onPick: onPickMock
      }
    });

    const redBtn = screen.getByLabelText('RED');
    await fireEvent.click(redBtn);

    const greenBtn = screen.getByLabelText('GREEN');
    await fireEvent.click(greenBtn);

    const blueBtn = screen.getByLabelText('BLUE');
    await fireEvent.click(blueBtn);

    expect(onPickMock).toHaveBeenCalledTimes(3);
  });
});
