import * as React from "react"

import { useIsMobile } from "@/hooks/use-mobile"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { type LucideIcon } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
  }[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const isMobile = useIsMobile()

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu className="grid grid-cols-2 gap-2">
          {items.map((item) => {
            const [open, setOpen] = React.useState(false)

            if (!isMobile) {
              return (
                <Dialog key={item.title} open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <SidebarMenuItem>
                      <SidebarMenuButton className="border border-gray-200 rounded-lg h-16 flex flex-col items-center justify-center">
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>{item.title}</DialogTitle>
                      <DialogDescription>
                        This is a dialog for {item.title.toLowerCase()}.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" defaultValue="Enter your name" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="message">Message</Label>
                        <Input id="message" defaultValue="Enter your message" />
                      </div>
                    </div>
                    <Button type="submit">Save changes</Button>
                  </DialogContent>
                </Dialog>
              )
            }

            return (
              <Drawer key={item.title} open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="border border-gray-200 rounded-lg h-16 flex flex-col items-center justify-center">
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader className="text-left">
                    <DrawerTitle>{item.title}</DrawerTitle>
                    <DrawerDescription>
                      This is a drawer for {item.title.toLowerCase()}.
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="grid gap-4 py-4 px-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" defaultValue="Enter your name" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="message">Message</Label>
                      <Input id="message" defaultValue="Enter your message" />
                    </div>
                  </div>
                  <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                    <Button type="submit">Save changes</Button>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

function SupportForm() {
  return (
    <div>
      <h1>Support</h1>
    </div>
  )
}

function FeedbackForm() {
  return (
    <div>
      <h1>Feedback</h1>
    </div>
  )
}