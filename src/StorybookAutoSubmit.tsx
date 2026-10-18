export default function StorybookAutoSubmit() {
  return (
    <input
      type="submit"
      ref={(ref) => {
        if (ref) {
          setTimeout(() => ref.click(), 50);
        }
      }}
      style={{ position: 'absolute', left: '-9999em' }}
    />
  );
}
