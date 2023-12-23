import { tw } from "@/helpers/utils";
import { useCallback } from "react";
import { FormControl, FormItem, FormLabel } from "./__form__";
import { Button } from "./button";
import { TextField } from "./input";
import { Text } from "./text";

type Props = { className?: string };

export function CreateInvoiceItemsDesktop({ className }: Props) {
  const addItem = useCallback(() => {}, []);
  const remove = useCallback((value: number) => {}, []);

  return (
    <div className={tw("flex-col gap-6", className)}>
      <ul className="grid grid-cols-12 items-center gap-x-4">
        <li className="col-span-5">
          <Text variant="primary">Item Name</Text>
        </li>
        <li className="col-span-2">
          <Text variant="primary">Qty.</Text>
        </li>
        <li className="col-span-2">
          <Text variant="primary">Price</Text>
        </li>
        <li className="col-span-2">
          <Text variant="primary">Total</Text>
        </li>
      </ul>

      <ul className="flex flex-col gap-5">
        {[1, 2, 3].map((field, index) => {
          return (
            <li
              key={field.toString()}
              className="grid grid-cols-12 items-center gap-x-4"
            >
              <FormItem as={FormLabel} className="col-span-5">
                <FormControl>
                  <TextField
                    type="text"
                    name={`items.${index}.name`}
                    placeholder="Banner Design"
                  />
                </FormControl>
              </FormItem>

              <FormItem as={FormLabel} className="col-span-2">
                <FormControl>
                  <TextField
                    type="number"
                    name={`items.${index}.quantity`}
                    placeholder="1"
                    step={1}
                  />
                </FormControl>
              </FormItem>

              <FormItem as={FormLabel} className="col-span-2">
                <FormControl>
                  <TextField
                    type="number"
                    name={`items.${index}.price`}
                    placeholder="200.00"
                    step={0.01}
                  />
                </FormControl>
              </FormItem>

              <FormItem className="col-span-2">
                <Text
                  as="output"
                  htmlFor={`items.${index}.price items.${index}.quantity`}
                  id={`items.${index}.total`}
                  name={`items.${index}.total`}
                  weight="bold"
                  className="text-[#888EB0] dark:text-[#888EB0]"
                >
                  {/* {watch(`items.${index}.total`)} */}
                  1234.00
                </Text>
              </FormItem>

              <FormItem className="col-span-1 justify-self-center">
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
