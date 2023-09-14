const translations: Record<string, string> = {
  title: 'Log in...',
  close: 'Close',
  selectMethod: 'Select one of the available authentication methods:',
  continue: 'Additional information required:',
  back: 'Back',
};

export const defaultT = (key: string) => translations[key];
