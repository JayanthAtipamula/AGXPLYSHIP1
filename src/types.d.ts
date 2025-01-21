import 'react';

declare module 'react' {
  export type FormEvent<T = Element> = React.BaseSyntheticEvent<Event, EventTarget & T, HTMLElement>;
  export type ChangeEvent<T = Element> = React.BaseSyntheticEvent<Event, EventTarget & T, HTMLElement>;
  
  interface FormHTMLAttributes<T> extends HTMLAttributes<T> {
    onSubmit?: (event: FormEvent<T>) => void;
  }
  
  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    type?: string;
    value?: string | number | readonly string[];
    onChange?: (event: ChangeEvent<T>) => void;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
      form: React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;
      input: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
      label: React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>;
      button: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
      textarea: React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;
    }
  }
} 