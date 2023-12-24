import { approximate, calculateTotal, endsWith, tw } from "@/helpers/utils";
import type { FormData } from "@/routes/invoices.create";
import { useCallback, useEffect } from "react";
import { get, useFieldArray, type FieldPathValue } from "react-hook-form";
import { useRemixFormContext } from "remix-hook-form";
import { v4 as uuid } from "uuid";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./__form__";
import { Button } from "./button";
import { TextField } from "./input";
import { Text } from "./text";

type Props = { className?: string };

export function CreateInvoiceItemsMobile({ className }: Props) {
  const { getValues, watch, setValue, control, register } =
    useRemixFormContext<FormData>();

  const { fields, append, remove } = useFieldArray<FormData>({
    name: "items",
    control: control,
    rules: {
      required: "Please add at least one item",
    },
  });

  useEffect(() => {
    const subscription = watch((_, { name, type }) => {
      const value = getValues();

      if (type === "change" && name) {
        if (endsWith(name, "quantity") || endsWith(name, "price")) {
          type FieldValueType = FieldPathValue<typeof value, typeof name>;

          const { items } = value;
          const [, indexString, fieldName] = name.split(".");
          const index = parseInt(indexString);

          const fieldValue: FieldValueType = get(value, name);

          if (fieldValue) {
            if (fieldName === "quantity")
              setValue(
                `items.${index}.total`,
                approximate(calculateTotal(fieldValue, items[index].price)),
              );
            else if (fieldName === "price")
              setValue(
                `items.${index}.total`,
                approximate(calculateTotal(items[index].quantity, fieldValue)),
              );
          }
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [getValues, setValue, watch]);

  const addItem = useCallback(() => {
    append({ id: uuid(), name: "", quantity: 0, price: 0, total: 0 });
  }, [append]);

  return (
    <div className={tw("flex-col gap-6", className)}>
      <ul className="flex flex-col gap-8">
        {fields.map((field, index) => {
          register(`items.${index}.total`);
          return (
            <li
              key={field.toString()}
              className="grid grid-cols-8 gap-x-4 gap-y-6"
            >
              <FormField
                name={`items.${index}.name`}
                render={({ field }) => (
                  <FormItem className="col-span-8">
                    <div className="flex items-center justify-between">
                      <FormLabel>Item Name</FormLabel>
                      <FormMessage />
                    </div>

                    <FormControl>
                      <TextField
                        type="text"
                        placeholder="Email Design"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name={`items.${index}.quantity`}
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Qty.</FormLabel>

                    <FormControl>
                      <TextField
                        type="number"
                        placeholder="1"
                        step={1}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name={`items.${index}.price`}
                render={({ field }) => (
                  <FormItem className="col-span-3">
                    <FormLabel>Price</FormLabel>

                    <FormControl>
                      <TextField
                        type="number"
                        placeholder="200.00"
                        step={0.01}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormItem className="col-span-2 self-start">
                <FormLabel htmlFor={`items.${index}.total`}>Total</FormLabel>
                <Text
                  as="output"
                  htmlFor={`items.${index}.price items.${index}.quantity`}
                  id={`items.${index}.total`}
                  name={`items.${index}.total`}
                  weight="bold"
                  className="mt-[1.1rem] text-[#888EB0] dark:text-[#888EB0]"
                >
                  {watch(`items.${index}.total`)}
                </Text>
              </FormItem>

              <FormItem className="col-span-1 mt-7 self-center justify-self-center">
                <button
                  type="button"
                  className="inline-block h-5 w-4 bg-[url(/icon-delete.svg)] bg-cover bg-no-repeat hover:bg-[url(/icon-delete-red.svg)] focus:bg-[url(/icon-delete-red.svg)]"
                  onClick={() => void remove(index)}
                >
                  <span className="sr-only">Delete Item</span>
                </button>
              </FormItem>
            </li>
          );
        })}
      </ul>

      <div>
        <Button type="button" variant="soft" onClick={addItem} fullWidth>
          &#43; Add New Item
        </Button>
      </div>
    </div>
  );
}
