import { tw } from "@/helpers/utils";
import { useCallback } from "react";
import { FormControl, FormItem, FormLabel, FormMessage } from "./__form__";
import { Button } from "./button";
import { TextField } from "./input";
import { Text } from "./text";

type Props = { className?: string };

export function CreateInvoiceItemsMobile({ className }: Props) {
  const addItem = useCallback(() => {}, []);
  const remove = useCallback((value: number) => {}, []);

  return (
    <div className={tw("flex-col gap-6", className)}>
      <ul className="flex flex-col gap-8">
        {[1, 2, 3].map((field, index) => {
          return (
            <li
              key={field.toString()}
              className="grid grid-cols-8 gap-x-4 gap-y-6"
            >
              <FormItem className="col-span-8">
                <div className="flex items-center justify-between">
                  <FormLabel>Item Name</FormLabel>
                  <FormMessage />
                </div>

                <FormControl>
                  <TextField
                    type="text"
                    name={`items.${index}.name`}
                    placeholder="Email Design"
                  />
                </FormControl>
              </FormItem>

              <FormItem className="col-span-2">
                <FormLabel>Qty.</FormLabel>

                <FormControl>
                  <TextField
                    type="number"
                    name={`items.${index}.quantity`}
                    placeholder="1"
                    step={1}
                  />
                </FormControl>
              </FormItem>

              <FormItem className="col-span-3">
                <FormLabel>Price</FormLabel>

                <FormControl>
                  <TextField
                    type="number"
                    name={`items.${index}.price`}
                    placeholder="200.00"
                    step={0.01}
                  />
                </FormControl>
              </FormItem>

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
                  {/* {watch(`items.${index}.total`)} */}
                  1234.00
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
