import {
  FormControl,
  FormDescription,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AutoFormLabel from "../common/label";
import AutoFormTooltip from "../common/tooltip";
import { AutoFormInputComponentProps } from "../types";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function AutoFormInput({
  label,
  isRequired,
  fieldConfigItem,
  fieldProps,
}: AutoFormInputComponentProps) {
  const { showLabel: _showLabel, ...fieldPropsWithoutShowLabel } = fieldProps;
  const showLabel = _showLabel === undefined ? true : _showLabel;
  const type = fieldProps.type || "text";
  const name = fieldProps.name || null;
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const tooglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-row  items-center space-x-2">
      <FormItem className="flex w-full flex-col justify-start">
        {showLabel && (
          <AutoFormLabel
            label={fieldConfigItem?.label || label}
            isRequired={isRequired}
          />
        )}
        <FormControl>
          {name !== "password" ? (
            <Input
              type={type}
              {...fieldPropsWithoutShowLabel}
              className="min-w-40 w-fit"
            />
          ) : (
            <div className="relative">
              <Input
                {...fieldPropsWithoutShowLabel}
                type={showPassword ? "text" : "password"}
                className="min-w-40 w-fit"
                placeholder="Votre mot de passe"
              />
              <span
                className="absolute left-40 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={tooglePasswordVisibility}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </span>
            </div>
          )}
        </FormControl>
        <AutoFormTooltip fieldConfigItem={fieldConfigItem} />
        <FormMessage />
      </FormItem>
    </div>
  );
}
