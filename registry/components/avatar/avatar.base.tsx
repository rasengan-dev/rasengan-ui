"use client";

import type * as React from "react";
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";

import { cn } from "@/lib/utils";
import { avatarStyles } from "./avatar.styles";

/** Rasengan UI parts take a plain string className on every engine. */
type Props<P> = Omit<P, "className"> & { className?: string };

export function Avatar({ className, size = "default", ...props }: Props<AvatarPrimitive.Root.Props> & { size?: "sm" | "default" | "lg" }) {
	return <AvatarPrimitive.Root data-slot="avatar" data-size={size} className={cn("group/avatar", avatarStyles.root, className)} {...props} />;
}

export function AvatarImage({ className, ...props }: Props<AvatarPrimitive.Image.Props>) {
	return <AvatarPrimitive.Image data-slot="avatar-image" className={cn(avatarStyles.image, className)} {...props} />;
}

/** Shown while the image loads or when it fails: initials, or an icon. */
export function AvatarFallback({ className, ...props }: Props<AvatarPrimitive.Fallback.Props>) {
	return <AvatarPrimitive.Fallback data-slot="avatar-fallback" className={cn(avatarStyles.fallback, className)} {...props} />;
}

/** Overlapping avatars, each ringed in the page colour so they stay apart. */
export function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
	return <div data-slot="avatar-group" role="group" className={cn(avatarStyles.group, className)} {...props} />;
}

/** The "+3" at the end of a group. */
export function AvatarGroupCount({ className, ...props }: React.ComponentProps<"span">) {
	return <span data-slot="avatar-group-count" className={cn(avatarStyles.count, className)} {...props} />;
}
