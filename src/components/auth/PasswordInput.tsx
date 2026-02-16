"use client"

import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type Props = React.InputHTMLAttributes<HTMLInputElement>

export default function PasswordInput(props: Props) {
  const [show, setShow] = useState(false)

  return (
    <div className="relative">
      <Input
        {...props}
        type={show ? "text" : "password"}
        className="pr-10"
      />

      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => setShow(v => !v)}
        className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7"
      >
        {show ? <EyeOff size={16} /> : <Eye size={16} />}
      </Button>
    </div>
  )
}
