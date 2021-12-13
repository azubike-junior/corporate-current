import React from "react";
import { classNames } from "./../../utils/classNames";

interface HookProps {
  label?: string;
  type?: string;
  readOnly?: boolean;
  value?: string;
  required?: boolean;
  name: string;
  placeholder?: string;
  onChange?: (e: any) => void;
  checked?: boolean;
  min?: number;
  max?: number;
  errors?: any;
  register?: any;
  validation?: any;
  optional?: boolean;
  message?: string;
  selectArray?: any;
  className?: string;
  productInfo?: boolean;
  label2?: boolean;
  pattern?: any;
  minLength?: number;
  maxLength?: number;
  onInput?: any
}

export function HookInputField({
  label,
  type,
  onChange,
  required,
  name,
  readOnly,
  checked,
  placeholder,
  errors,
  register,
  optional,
  message,
  label2,
  minLength,
  maxLength,
  value,
  onInput,
  pattern,
}: HookProps) {
  return (
    <div
      className={classNames(
        "form-group form-group-default",
        required && "required"
      )}
    >
      <label>{label}</label>
      {required && <span className="text-danger pl-2">*</span>}
      {optional && <span className="text-muted pl-2">optional</span>}
      {errors && (
        <span style={{ fontSize: "10px" }} className="text-danger pl-2">
          {message}
        </span>
      )}
      <input
        autoComplete="off"
        {...register(name, {
          maxLength,
          minLength,
          pattern,
          required,
        })}
        value={value}
        type={type}
        onInput={onInput}
        placeholder={placeholder}
        readOnly={readOnly}
        checked={checked}
        className={classNames("form-control text-black")}
      />
    </div>
  );
}

export function SelectInput({
  required,
  label,
  name,
  register,
  selectArray,
  errors,
  message,
  productInfo,
  className,
  maxLength,
  minLength,
  pattern,
}: HookProps) {
  return (
    <div className={classNames(className && className)}>
      <label>
        {label}{" "}
        {productInfo && (
          <a href="#" className="font-12" style={{ color: "green" }}>
            (More Info on our Products)
          </a>
        )}{" "}
        {required && <span className="text-danger">*</span>}
      </label>
      {errors && (
        <span style={{ fontSize: "10px" }} className="text-danger pl-2">
          {message}
        </span>
      )}
      <select
        {...register(name, {
          maxLength,
          minLength,
          pattern,
          required,
        })}
        className={classNames("form-control")}
      >
        {selectArray?.map((_item: any) => {
          return (
            // <div key={}>
            <option value={_item.value}>{_item.text}</option>
            // </div>
          );
        })}
      </select>
    </div>
  );
}

export function CheckInput({
  required,
  label,
  name,
  register,
  onChange,
  checked,
}: HookProps) {
  return (
    <div className=" pl-4 form-check-inline flex justify-center">
      <input
        checked={checked}
        {...register(name)}
        type="checkbox"
        className="form-check-input mt-1"
        onChange={onChange}
        data-parsley-errors-container="#error-checkbox"
      />
      <label className="pt-3">{label}</label>
    </div>
  );
}
