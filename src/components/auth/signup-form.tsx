
"use client";

import * as React from "react";
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { Loader2, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { User, UserRole } from "@/lib/types";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Phone number must be 10 digits").max(10, "Phone number must be 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["farmer", "agent", "government", "bank"]),
  region: z.string().optional(),
});

const hardcodedCredentials: Record<Exclude<UserRole, 'farmer'>, Omit<User, 'id' | 'role' | 'name'>> = {
    agent: { phone: '8765432109', password: 'password', region: 'Maharashtra' },
    bank: { phone: '6543210987', password: 'password' },
    government: { phone: '7654321098', password: 'password' },
};

export function SignupForm() {
  const router = useRouter();
  const { toast } = useToast();
  const { login } = useAuth(); // We'll use login after "creating" a user
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedRole, setSelectedRole] = React.useState<UserRole | ''>('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      password: "",
      role: "farmer",
      region: "",
    },
  });

  const roleValue = form.watch("role");

  React.useEffect(() => {
    setSelectedRole(roleValue as UserRole);
  }, [roleValue]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.role !== 'farmer') {
        toast({
            variant: "destructive",
            title: "Signup Not Available",
            description: `Please use the provided credentials to log in as a ${values.role}.`,
        });
        return;
    }
    
    setIsLoading(true);
    // This is a mock signup. In a real app, you would have an API call
    // to a backend to create a new user. Here we'll just log them in
    // as if the user was created. For this demo, we can't add new users
    // to the `users.json` file, so we'll just log in a pre-existing farmer.
    
    // We will simulate a successful signup and then login.
    // For the demo, let's just log in the first farmer.
    const success = await login("9876543210", "password");
    setIsLoading(false);

    if (success) {
      toast({
        title: "Signup Successful",
        description: "Redirecting to your dashboard...",
      });
      router.push('/dashboard');
    } else {
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: "Could not sign you up. Please try again.",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>I am a...</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="farmer">Farmer</SelectItem>
                  <SelectItem value="agent">Agent</SelectItem>
                  <SelectItem value="bank">Bank Official</SelectItem>
                  <SelectItem value="government">Government Official</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {selectedRole && selectedRole !== 'farmer' && (
            <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Demo Credentials</AlertTitle>
                <AlertDescription>
                   To log in as a {selectedRole}, please use the following credentials on the login page:
                   <ul className="list-disc pl-5 mt-2">
                     <li><strong>Phone:</strong> {hardcodedCredentials[selectedRole].phone}</li>
                     <li><strong>Password:</strong> {hardcodedCredentials[selectedRole].password}</li>
                   </ul>
                </AlertDescription>
            </Alert>
        )}

        {selectedRole === 'farmer' && (
          <>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Ramesh Kumar" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="9876543210" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
                control={form.control}
                name="region"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Region</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., Punjab" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
          </>
        )}

        <Button type="submit" className="w-full" disabled={isLoading || (selectedRole !== 'farmer')}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {selectedRole === 'farmer' ? 'Sign Up' : 'Go to Login'}
        </Button>
      </form>
    </Form>
  );
}
