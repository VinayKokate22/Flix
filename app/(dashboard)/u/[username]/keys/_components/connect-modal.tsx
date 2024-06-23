"use client";

import { createIngress } from "@/actions/ingress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IngressInput } from "livekit-server-sdk";
import { AlertTriangle } from "lucide-react";
import { ElementRef, useRef, useState, useTransition } from "react";
import { toast } from "sonner";

const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);

type IngressType = typeof RTMP | typeof WHIP;

export const ConnectModal = () => {
  const closeRef = useRef<ElementRef<"button">>(null);
  const [ispending, starTransition] = useTransition();
  const [ingressType, setIngressType] = useState<IngressType>(RTMP);
  const onSubmit = () => {
    starTransition(() => {
      createIngress(parseInt(ingressType))
        .then(() => {
          toast("Ingress created");
          closeRef?.current?.click();
        })
        .catch(() => toast.error("Something went wrong"));
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary">Generate connection</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Connection</DialogTitle>
        </DialogHeader>
        <Select
          value={ingressType}
          onValueChange={(value) => setIngressType(value)}
          disabled={ispending}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Ingress Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={RTMP}>RTMP</SelectItem>
            <SelectItem value={WHIP}>WHIP</SelectItem>
          </SelectContent>
        </Select>

        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>
            This action will reset the current stream connection
          </AlertDescription>
        </Alert>
        <div className="flex justify-between">
          <DialogClose ref={closeRef} asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button disabled={ispending} onClick={onSubmit} variant="primary">
            Generate
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
