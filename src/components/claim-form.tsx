'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Link, Upload, Bot } from 'lucide-react';
import { useState } from 'react';

const formSchema = z.object({
  claimText: z.string().optional(),
  claimUrl: z.union([z.string().url({ message: "Please enter a valid URL." }), z.string().length(0)]).optional(),
  claimFile: z.any().optional(),
}).refine(data => !!data.claimText || !!data.claimUrl || (data.claimFile && data.claimFile.length > 0), {
  message: 'Please provide a claim, URL, or file.',
  path: ['claimText'], // Assign error to one field for display
});


type ClaimFormProps = {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
};

export function ClaimForm({ onSubmit, isLoading }: ClaimFormProps) {
  const [fileName, setFileName] = useState('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      claimText: '',
      claimUrl: '',
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
      form.setValue('claimFile', event.target.files);
    } else {
      setFileName('');
      form.setValue('claimFile', null);
    }
  };
  
  const formRef = React.useRef<HTMLFormElement>(null);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.handleSubmit(() => {
        onSubmit(new FormData(formRef.current!));
    })(e);
  };


  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="text-primary" />
          Verify a Claim
        </CardTitle>
        <CardDescription>
          Enter a claim, a URL to an article, or upload a document for analysis.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <FormField
              control={form.control}
              name="claimText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Claim Text</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., 'Drinking celery juice cures all diseases...'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center space-x-2">
              <hr className="flex-grow border-t" />
              <span className="text-xs text-muted-foreground">OR</span>
              <hr className="flex-grow border-t" />
            </div>
            <FormField
              control={form.control}
              name="claimUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Link className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="https://example.com/article" {...field} className="pl-10" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center space-x-2">
              <hr className="flex-grow border-t" />
              <span className="text-xs text-muted-foreground">OR</span>
              <hr className="flex-grow border-t" />
            </div>
            <FormField
              control={form.control}
              name="claimFile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload File</FormLabel>
                  <FormControl>
                     <div className="relative">
                       <Input id="claimFile" name="claimFile" type="file" className="hidden" onChange={handleFileChange} />
                       <label htmlFor="claimFile" className="flex items-center justify-center w-full h-10 px-3 py-2 text-sm border-2 border-dashed rounded-md cursor-pointer border-input bg-transparent hover:bg-accent">
                         <Upload className="w-4 h-4 mr-2" />
                         {fileName || 'Choose a file'}
                       </label>
                     </div>
                  </FormControl>
                   <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Bot className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Bot className="mr-2 h-4 w-4" />
                  Verify with AI
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
