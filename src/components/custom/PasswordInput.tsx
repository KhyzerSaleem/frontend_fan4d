"use client"

import React, { useState } from "react"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

interface PasswordInputProps {
  id: string
  name: string
  label?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  id,
  name,
  label = "كلمة المرور",
  placeholder = "******9",
  value,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState)
  }

  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          name={name}
          placeholder={placeholder}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
        />
        <Button
          type="button"
          size={'icon'}
          variant={'ghost'}
          className="absolute ltr:right-3 rtl:left-3 top-1/2 transform -translate-y-1/2 bg-transparent "
          onClick={togglePasswordVisibility}
        >
          <img src="/assets/icons/EyeIcon.svg" alt="icon" />
        </Button>
      </div>
    </div>
  )
}

export default PasswordInput
