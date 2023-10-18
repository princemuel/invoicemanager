interface ModalState {
  isVisible: boolean;
  showModal: () => void;
  hideModal: () => void;
  toggleState: () => void;
}

interface IProvider {
  id: 'github' | 'google';
  name: Capitalize<IProvider['id']>;
}

interface IParams {
  [key: string]: string | undefined;
}
interface LayoutRouteProps {
  [key: string]: React.ReactNode;
}

// interface ServerActionResult<Result>
//   extends Promise<
//     | Result
//     | {
//         error: string;
//       }
//   > {}

// interface ServerActionResult<Result>
//   extends Promise<
//     | Result
//     | {
//         error: string;
//       }
//   > {}

type SuccessResponseCode = 200;
type ErrorResponseCode = 400 | 401 | 403 | 404 | 500;
type ResponseCode = SuccessResponseCode | ErrorResponseCode;

type ResponseShape = {
  [Code in ResponseCode]: {
    code: Code;
    body: Code extends SuccessResponseCode
      ? { success: true }
      : { success: false; error: string };
  };
}[ResponseCode];

type PrefixType<E extends { type: string }> = {
  type: `PREFIX_${E['type']}`;
} & Omit<E, 'type'>;

type ExampleEvent = {
  [E in Event as E['type']]: PrefixType<E>;
}[Event['type']];
