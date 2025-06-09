
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const appearanceFormSchema = z.object({
  theme: z.enum(['light', 'dark', 'system'], {
    required_error: "Please select a theme.",
  }),
  navigationStyle: z.enum(['vertical', 'horizontal'], {
    required_error: "Please select a navigation style.",
  }),
});

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  bio: z.string().max(160).optional(),
});

const Settings: React.FC = () => {
  const { toast } = useToast();
  
  const appearanceForm = useForm<z.infer<typeof appearanceFormSchema>>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues: {
      theme: 'system',
      navigationStyle: 'vertical',
    },
  });
  
  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "John Doe",
      email: "john.doe@university.edu",
      bio: "Professor of Computer Science with 10+ years of experience in teaching and research.",
    },
  });
  
  function onAppearanceSubmit(data: z.infer<typeof appearanceFormSchema>) {
    toast({
      title: "Appearance settings updated",
      description: "Your appearance settings have been updated.",
    });
    console.log(data);
  }
  
  function onProfileSubmit(data: z.infer<typeof profileFormSchema>) {
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated.",
    });
    console.log(data);
  }

  return (
    <div className="container mx-auto py-6 space-y-8 animate-fade-in">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>
      
      <Separator className="my-6" />
      
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Manage your personal information and how it appears to others.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder.svg" alt="Profile picture" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline">Change Avatar</Button>
                  <p className="text-xs text-muted-foreground">
                    Recommended: Square JPG, PNG, or GIF, at least 500x500 pixels.
                  </p>
                </div>
              </div>
              
              <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                  <FormField
                    control={profileForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          This is the name that will be displayed on your profile.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={profileForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          This email will be used for notifications and communications.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={profileForm.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          Brief description for your profile. Max 160 characters.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit">Update Profile</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password to keep your account secure.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <Button 
                onClick={() => toast({
                  title: "Password updated",
                  description: "Your password has been updated successfully.",
                })}
              >
                Change Password
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize how the PyGenicArc interface looks for you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...appearanceForm}>
                <form onSubmit={appearanceForm.handleSubmit(onAppearanceSubmit)} className="space-y-6">
                  <FormField
                    control={appearanceForm.control}
                    name="theme"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Theme</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="light" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Light
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="dark" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Dark
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="system" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                System
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormDescription>
                          Select a theme preference for the interface.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={appearanceForm.control}
                    name="navigationStyle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Navigation Style</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="vertical" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Vertical Sidebar
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="horizontal" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Horizontal Navigation
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormDescription>
                          Choose how navigation appears in the application.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit">Save Appearance Settings</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Visual Preferences</CardTitle>
              <CardDescription>
                Additional visual settings to customize your experience.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="compact-mode">Compact Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Use a more compact layout to fit more content on screen
                  </p>
                </div>
                <Switch id="compact-mode" onCheckedChange={() => 
                  toast({
                    title: "Compact mode updated",
                    description: "Your preference has been saved.",
                  })
                } />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="high-contrast">High Contrast</Label>
                  <p className="text-sm text-muted-foreground">
                    Increase contrast for better visibility
                  </p>
                </div>
                <Switch id="high-contrast" onCheckedChange={() => 
                  toast({
                    title: "High contrast updated",
                    description: "Your preference has been saved.",
                  })
                } />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="animations">Animations</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable or disable UI animations
                  </p>
                </div>
                <Switch id="animations" defaultChecked onCheckedChange={() => 
                  toast({
                    title: "Animations setting updated",
                    description: "Your preference has been saved.",
                  })
                } />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>
                Configure which email notifications you want to receive.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="assignment-emails">Assignment Submissions</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications when students submit assignments
                  </p>
                </div>
                <Switch id="assignment-emails" defaultChecked onCheckedChange={() => 
                  toast({
                    title: "Assignment notifications updated",
                    description: "Your preference has been saved.",
                  })
                } />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="discussion-emails">Discussion Forum Activity</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications for new posts in discussion forums
                  </p>
                </div>
                <Switch id="discussion-emails" defaultChecked onCheckedChange={() => 
                  toast({
                    title: "Discussion notifications updated",
                    description: "Your preference has been saved.",
                  })
                } />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="system-emails">System Announcements</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive important system announcements and updates
                  </p>
                </div>
                <Switch id="system-emails" defaultChecked onCheckedChange={() => 
                  toast({
                    title: "System notifications updated",
                    description: "Your preference has been saved.",
                  })
                } />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="digest-emails">Daily Digest</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive a daily summary of all activities
                  </p>
                </div>
                <Switch id="digest-emails" onCheckedChange={() => 
                  toast({
                    title: "Daily digest updated",
                    description: "Your preference has been saved.",
                  })
                } />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>In-App Notifications</CardTitle>
              <CardDescription>
                Configure which notifications appear within the application.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="app-assignments">Assignment Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive in-app notifications for assignment activities
                  </p>
                </div>
                <Switch id="app-assignments" defaultChecked onCheckedChange={() => 
                  toast({
                    title: "In-app assignment notifications updated",
                    description: "Your preference has been saved.",
                  })
                } />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="app-messages">Direct Messages</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive in-app notifications for new messages
                  </p>
                </div>
                <Switch id="app-messages" defaultChecked onCheckedChange={() => 
                  toast({
                    title: "Direct message notifications updated",
                    description: "Your preference has been saved.",
                  })
                } />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="app-analytics">Analytics Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive in-app notifications for analytics insights
                  </p>
                </div>
                <Switch id="app-analytics" onCheckedChange={() => 
                  toast({
                    title: "Analytics notifications updated",
                    description: "Your preference has been saved.",
                  })
                } />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
