import { useState, type FormEvent } from 'react';
import { LoaderCircleIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/toast';
import { GitHubIcon, GoogleIcon } from '@/components/icons';

function SignInForm() {
  const [pending, setPending] = useState(false);
  const [invalid, setInvalid] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const password = new FormData(event.currentTarget).get('password') as string;
    setInvalid(password.length < 8);
    if (password.length < 8) return;
    setPending(true);
    setTimeout(() => {
      setPending(false);
      toast.success('Welcome back, Naruto');
    }, 1200);
  };

  return (
    <form onSubmit={submit} className="grid gap-4" noValidate>
      <Field>
        <FieldLabel>Email</FieldLabel>
        <Input
          name="email"
          type="email"
          placeholder="naruto@konoha.dev"
          defaultValue="naruto@konoha.dev"
        />
      </Field>
      <Field invalid={invalid}>
        <div className="flex items-center justify-between">
          <FieldLabel>Password</FieldLabel>
          <a
            href="#forgot"
            className="rounded-control text-sm text-muted-foreground underline-offset-4 outline-none hover:underline focus-visible:focus-ring"
          >
            Forgot your password?
          </a>
        </div>
        <Input name="password" type="password" placeholder="At least 8 characters" />
        <FieldError match={invalid}>Use at least 8 characters.</FieldError>
      </Field>
      <Label>
        <Checkbox defaultChecked /> Keep me signed in
      </Label>
      <Button type="submit" disabled={pending}>
        {pending && <LoaderCircleIcon className="animate-spin" />}
        {pending ? 'Signing in…' : 'Sign in'}
      </Button>
    </form>
  );
}

function SignUpForm() {
  return (
    <form
      className="grid gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        toast.success('Account created', {
          description: 'Check your inbox to confirm your email.',
        });
      }}
    >
      <div className="grid grid-cols-2 gap-3">
        <Field>
          <FieldLabel>First name</FieldLabel>
          <Input placeholder="Naruto" />
        </Field>
        <Field>
          <FieldLabel>Last name</FieldLabel>
          <Input placeholder="Uzumaki" />
        </Field>
      </div>
      <Field>
        <FieldLabel>Email</FieldLabel>
        <Input type="email" placeholder="naruto@konoha.dev" />
      </Field>
      <Field>
        <FieldLabel>Password</FieldLabel>
        <Input type="password" />
      </Field>
      <Button type="submit">Create account</Button>
    </form>
  );
}

/** A split sign-in screen: a quote panel in the primary on the left, the form with sign-in and sign-up tabs on the right. */
export function AuthenticationExample() {
  return (
    <div className="grid overflow-hidden rounded-xl border-village bg-card text-card-foreground shadow-sm lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between gap-10 bg-primary p-10 text-primary-foreground lg:flex">
        <div className="flex items-center gap-2 font-display text-lg font-semibold tracking-display">
          <span className="size-5 rounded-full border-4 border-current" aria-hidden />
          Hidden Leaf Cloud
        </div>
        <blockquote className="grid gap-3">
          <p className="font-display text-xl leading-snug">
            “We moved the whole dashboard to Kiri over a coffee. Not a single component changed,
            only the village.”
          </p>
          <footer className="text-sm">Tsunade, Fifth Hokage</footer>
        </blockquote>
      </div>
      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="grid w-full max-w-sm gap-6">
          <div className="grid gap-1 text-center">
            <h2 className="font-display text-2xl font-semibold tracking-display case-heading">
              Welcome back
            </h2>
            <p className="text-sm text-muted-foreground">Sign in to your account or create one.</p>
          </div>
          <Tabs defaultValue="sign-in" className="grid gap-6">
            <TabsList className="w-full">
              <TabsTrigger value="sign-in" className="flex-1">
                Sign in
              </TabsTrigger>
              <TabsTrigger value="sign-up" className="flex-1">
                Sign up
              </TabsTrigger>
            </TabsList>
            <TabsContent value="sign-in">
              <SignInForm />
            </TabsContent>
            <TabsContent value="sign-up">
              <SignUpForm />
            </TabsContent>
          </Tabs>
          <div className="flex items-center gap-3 text-xs text-muted-foreground uppercase">
            <Separator className="flex-1" />
            or
            <Separator className="flex-1" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline">
              <GitHubIcon /> GitHub
            </Button>
            <Button variant="outline">
              <GoogleIcon /> Google
            </Button>
          </div>
          <p className="text-center text-xs text-balance text-muted-foreground">
            By continuing, you agree to our{' '}
            <a href="#terms" className="underline underline-offset-4 hover:text-foreground">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#privacy" className="underline underline-offset-4 hover:text-foreground">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
