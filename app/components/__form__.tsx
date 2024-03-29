import { tw } from "@/helpers/utils";
import type * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import type { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";
import { RemixFormProvider, useRemixFormContext } from "remix-hook-form";
import { Label } from "./label";

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};
type FormItemContextValue = {
  id: string;
};

const FormFieldContext = React.createContext({} as FormFieldContextValue);

const FormItemContext = React.createContext({} as FormItemContextValue);

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useRemixFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

const FormProvider = RemixFormProvider;

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const FormItem = React.forwardRef(
  ({ as, className, ...restProps }, forwardedRef) => {
    const id = React.useId();
    const As = as || "div";

    return (
      <FormItemContext.Provider value={{ id }}>
        <As
          className={tw("group flex flex-col gap-3", className)}
          {...restProps}
          ref={forwardedRef}
        />
      </FormItemContext.Provider>
    );
  },
) as ForwardRefComponent<"div", {}>;
FormItem.displayName = "FormItem";

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...restProps }, forwardedRef) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      id={formItemId}
      aria-describedby={
        !error ?
          `${formDescriptionId}`
        : `${formDescriptionId} ${formMessageId}`
      }
      aria-errormessage={formMessageId}
      aria-invalid={Boolean(error)}
      {...restProps}
      ref={forwardedRef}
    />
  );
});
FormControl.displayName = "FormControl";

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...restProps }, forwardedRef) => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      className={tw(error && "text-accent-200 dark:text-accent-200", className)}
      htmlFor={formItemId}
      {...restProps}
      ref={forwardedRef}
    />
  );
});
FormLabel.displayName = "FormLabel";

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...restProps }, forwardedRef) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;
  if (!body) return null;

  return (
    <p
      role="alert"
      id={formMessageId}
      className={tw(
        "text-400 font-medium leading-200 -tracking-200 text-accent-200",
        className,
      )}
      {...restProps}
      ref={forwardedRef}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = "FormMessage";

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...restProps }, forwardedRef) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      id={formDescriptionId}
      className={tw("text-xs", className)}
      {...restProps}
      ref={forwardedRef}
    />
  );
});
FormDescription.displayName = "FormDescription";

export {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormProvider,
  useFormField,
};
