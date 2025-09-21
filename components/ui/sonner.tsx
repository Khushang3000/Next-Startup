"use client"

import { Toaster as Sonner } from "sonner"

export function Toaster() {
  return (
    <Sonner
      position="top-right"
      richColors
      closeButton
    />
  )
}

//copy pasted this wrapper component from docs.
//now just import the toaster whereever you wanna use it.