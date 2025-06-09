import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { format, isSameDay, isSameMonth, addDays, addHours } from 'date-fns';
import { 
  CalendarPlus, 
  Check, 
  ChevronLeft, 
  ChevronRight,
  Clock,
  FileText,
  GraduationCap,
  List,
  Pencil,
  Plus,
  SlidersHorizontal,
  Trash2,
  Users,
  Calendar as CalendarIcon
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

// Type definitions
interface Event {
  id: string;
  title: string;
  date: Date;
  endDate?: Date;
  startTime?: string;
  endTime?: string;
  type: 'class' | 'exam' | 'assignment' | 'meeting' | 'reminder';
  description?: string;
  location?: string;
  recurring?: boolean;
  color?: string;
  attendees?: string[];
}

// Sample events data
const initialEvents: Event[] = [
  {
    id: '1',
    title: 'Database Management Lecture',
    date: new Date(2025, 4, 20),
    startTime: '10:00',
    endTime: '11:30',
    type: 'class',
    description: 'Covering SQL JOIN operations',
    location: 'Room 302',
    recurring: true,
    color: '#4caf50'
  },
  {
    id: '2',
    title: 'Programming Fundamentals',
    date: new Date(2025, 4, 20),
    startTime: '13:00',
    endTime: '14:30',
    type: 'class',
    description: 'Introduction to loops',
    location: 'Computer Lab 1',
    recurring: true,
    color: '#2196f3'
  },
  {
    id: '3',
    title: 'Midterm Exams',
    date: new Date(2025, 4, 25),
    startTime: '09:00',
    endTime: '11:00',
    type: 'exam',
    description: 'Bring your student ID',
    location: 'Examination Hall',
    recurring: false,
    color: '#f44336'
  },
  {
    id: '4',
    title: 'Faculty Meeting',
    date: new Date(2025, 4, 22),
    startTime: '15:00',
    endTime: '16:00',
    type: 'meeting',
    description: 'Discussing semester progress',
    location: 'Conference Room',
    recurring: false,
    color: '#9c27b0'
  },
  {
    id: '5',
    title: 'Assignment Deadline',
    date: new Date(2025, 4, 28),
    type: 'assignment',
    description: 'Database normalization assignment due',
    recurring: false,
    color: '#ff9800'
  },
  {
    id: '6',
    title: 'Office Hours',
    date: new Date(2025, 4, 21),
    startTime: '14:00',
    endTime: '16:00',
    type: 'meeting',
    description: 'Student consultation hours',
    location: 'Office 105',
    recurring: true,
    color: '#795548'
  },
  {
    id: '7',
    title: 'Submit Grades',
    date: new Date(2025, 4, 30),
    type: 'reminder',
    description: 'Deadline for midterm grade submission',
    recurring: false,
    color: '#607d8b'
  }
];

const CalendarPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedView, setSelectedView] = useState<'month' | 'week' | 'day' | 'list'>('month');
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showEventDialog, setShowEventDialog] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: '',
    date: new Date(),
    type: 'class',
    color: '#4caf50'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [filters, setFilters] = useState<{
    types: string[],
    showRecurring: boolean
  }>({
    types: ['class', 'exam', 'assignment', 'meeting', 'reminder'],
    showRecurring: true
  });
  
  const { toast } = useToast();

  // Get events for the selected date
  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      return isSameDay(event.date, date) && 
        filters.types.includes(event.type) && 
        (filters.showRecurring || !event.recurring);
    });
  };

  // Get events for the selected month view
  const getEventsForMonth = (date: Date) => {
    return events.filter(event => {
      return isSameMonth(event.date, date) && 
        filters.types.includes(event.type) && 
        (filters.showRecurring || !event.recurring);
    });
  };

  // Handle day cell rendering to show events
  const renderDay = (date: Date) => {
    const dayEvents = getEventsForDate(date);
    if (dayEvents.length === 0) return null;
    
    return (
      <div className="absolute bottom-0 left-0 right-0 flex flex-wrap gap-1 px-1 pb-1 overflow-hidden">
        {dayEvents.slice(0, 3).map((event, i) => (
          <div 
            key={event.id}
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: event.color || '#4caf50' }}
          />
        ))}
        {dayEvents.length > 3 && (
          <div className="text-xs text-muted-foreground ml-1">
            +{dayEvents.length - 3}
          </div>
        )}
      </div>
    );
  };

  // Handle opening event form for creating a new event
  const handleAddEvent = (date?: Date) => {
    setIsEditing(false);
    setNewEvent({
      title: '',
      date: date || selectedDate || new Date(),
      type: 'class',
      color: '#4caf50'
    });
    setShowEventDialog(true);
  };

  // Handle opening event form for editing
  const handleEditEvent = (event: Event) => {
    setIsEditing(true);
    setNewEvent(event);
    setShowEventDialog(true);
  };

  // Handle saving an event (create or update)
  const handleSaveEvent = () => {
    if (!newEvent.title || !newEvent.date) {
      toast({
        title: "Missing information",
        description: "Please provide at least a title and date for the event.",
        variant: "destructive",
      });
      return;
    }

    if (isEditing && selectedEvent) {
      // Update existing event
      const updatedEvents = events.map(event => 
        event.id === selectedEvent.id ? { ...event, ...newEvent } : event
      );
      setEvents(updatedEvents);
      toast({
        title: "Event Updated",
        description: "Your calendar event has been updated successfully."
      });
    } else {
      // Create new event
      const eventToAdd = {
        ...newEvent,
        id: String(Date.now()),
      } as Event;
      
      setEvents([...events, eventToAdd]);
      toast({
        title: "Event Added",
        description: "Your new calendar event has been added successfully."
      });
    }
    
    setShowEventDialog(false);
    setNewEvent({
      title: '',
      date: new Date(),
      type: 'class',
      color: '#4caf50'
    });
  };

  // Handle deleting an event
  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter(event => event.id !== eventId));
    toast({
      title: "Event Deleted",
      description: "The calendar event has been deleted successfully."
    });
    setSelectedEvent(null);
  };

  // Handle filter changes
  const handleFilterChange = (type: string, checked: boolean) => {
    if (checked) {
      setFilters({...filters, types: [...filters.types, type]});
    } else {
      setFilters({...filters, types: filters.types.filter(t => t !== type)});
    }
  };

  // Get event type icon
  const getEventIcon = (type: string) => {
    switch(type) {
      case 'class':
        return <GraduationCap className="h-4 w-4" />;
      case 'exam':
        return <FileText className="h-4 w-4" />;
      case 'assignment':
        return <Check className="h-4 w-4" />;
      case 'meeting':
        return <Users className="h-4 w-4" />;
      case 'reminder':
        return <Clock className="h-4 w-4" />;
      default:
        return <CalendarPlus className="h-4 w-4" />;
    }
  };

  // Get event badge color
  const getEventBadge = (type: string) => {
    switch(type) {
      case 'class':
        return <Badge className="bg-green-500">{type}</Badge>;
      case 'exam':
        return <Badge className="bg-red-500">{type}</Badge>;
      case 'assignment':
        return <Badge className="bg-orange-500">{type}</Badge>;
      case 'meeting':
        return <Badge className="bg-purple-500">{type}</Badge>;
      case 'reminder':
        return <Badge className="bg-blue-500">{type}</Badge>;
      default:
        return <Badge>{type}</Badge>;
    }
  };

  // Function to generate week view dates
  const getWeekDays = (date: Date) => {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay());
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      days.push(new Date(start.getTime()));
      start.setDate(start.getDate() + 1);
    }
    
    return days;
  };

  // Function to handle sharing/exporting the calendar
  const handleShareCalendar = () => {
    toast({
      title: "Calendar Exported",
      description: "Calendar has been exported as iCal file."
    });
  };
  
  // Function to handle syncing with school LMS
  const handleSyncCalendar = () => {
    toast({
      title: "Calendar Synced",
      description: "Successfully synced with school Learning Management System."
    });
  };

  // Filter function for upcoming events
  const getUpcomingEvents = () => {
    const now = new Date();
    return events
      .filter(event => event.date > now)
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(0, 5);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Calendar</h1>
          <p className="text-muted-foreground">Manage your classes and academic schedule</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            className="hover-scale"
            onClick={handleSyncCalendar}
          >
            <Clock className="mr-2 h-4 w-4" />
            Sync with LMS
          </Button>
          
          <Button 
            variant="outline"
            className="hover-scale"
            onClick={handleShareCalendar}
          >
            <CalendarPlus className="mr-2 h-4 w-4" />
            Export Calendar
          </Button>
          
          <Button 
            onClick={() => handleAddEvent()} 
            className="hover-scale"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Calendar and Events */}
        <div className="lg:col-span-3 space-y-4">
          <Card>
            <CardHeader className="pb-3 flex flex-row justify-between items-center">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setSelectedView('month')}>Month</Button>
                <Button variant="outline" size="sm" onClick={() => setSelectedView('week')}>Week</Button>
                <Button variant="outline" size="sm" onClick={() => setSelectedView('day')}>Day</Button>
                <Button variant="outline" size="sm" onClick={() => setSelectedView('list')}>List</Button>
              </div>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-4">
                  <div className="space-y-4">
                    <h3 className="font-medium mb-2">Event Types</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="filter-class"
                          checked={filters.types.includes('class')}
                          onChange={(e) => handleFilterChange('class', e.target.checked)}
                          className="mr-2"
                        />
                        <label htmlFor="filter-class" className="flex items-center text-sm">
                          <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
                          Classes
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="filter-exam"
                          checked={filters.types.includes('exam')}
                          onChange={(e) => handleFilterChange('exam', e.target.checked)}
                          className="mr-2"
                        />
                        <label htmlFor="filter-exam" className="flex items-center text-sm">
                          <div className="h-3 w-3 bg-red-500 rounded-full mr-2"></div>
                          Exams
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="filter-assignment"
                          checked={filters.types.includes('assignment')}
                          onChange={(e) => handleFilterChange('assignment', e.target.checked)}
                          className="mr-2"
                        />
                        <label htmlFor="filter-assignment" className="flex items-center text-sm">
                          <div className="h-3 w-3 bg-orange-500 rounded-full mr-2"></div>
                          Assignments
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="filter-meeting"
                          checked={filters.types.includes('meeting')}
                          onChange={(e) => handleFilterChange('meeting', e.target.checked)}
                          className="mr-2"
                        />
                        <label htmlFor="filter-meeting" className="flex items-center text-sm">
                          <div className="h-3 w-3 bg-purple-500 rounded-full mr-2"></div>
                          Meetings
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="filter-reminder"
                          checked={filters.types.includes('reminder')}
                          onChange={(e) => handleFilterChange('reminder', e.target.checked)}
                          className="mr-2"
                        />
                        <label htmlFor="filter-reminder" className="flex items-center text-sm">
                          <div className="h-3 w-3 bg-blue-500 rounded-full mr-2"></div>
                          Reminders
                        </label>
                      </div>
                    </div>
                    
                    <h3 className="font-medium mb-2">Other Filters</h3>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="filter-recurring"
                        checked={filters.showRecurring}
                        onChange={(e) => setFilters({...filters, showRecurring: e.target.checked})}
                        className="mr-2"
                      />
                      <label htmlFor="filter-recurring" className="text-sm">Show Recurring Events</label>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </CardHeader>
            
            <CardContent>
              <Tabs value={selectedView} onValueChange={(value) => setSelectedView(value as any)}>
                <TabsContent value="month" className="animate-fade-in">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">
                      {selectedDate ? format(selectedDate, 'MMMM yyyy') : 'Calendar'}
                    </h2>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          const newDate = new Date(selectedDate!);
                          newDate.setMonth(newDate.getMonth() - 1);
                          setSelectedDate(newDate);
                        }}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          const newDate = new Date(selectedDate!);
                          newDate.setMonth(newDate.getMonth() + 1);
                          setSelectedDate(newDate);
                        }}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setSelectedDate(new Date())}
                      >
                        Today
                      </Button>
                    </div>
                  </div>
                  
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="w-full"
                    modifiers={{
                      event: (date) => {
                        const eventsToday = getEventsForDate(date);
                        return eventsToday.length > 0;
                      }
                    }}
                    modifiersClassNames={{
                      event: "ring-2 ring-primary ring-offset-background ring-offset-1"
                    }}
                    components={{
                      DayContent: ({ date, ...props }) => (
                        <div className="relative h-10 w-10 p-0 flex items-center justify-center">
                          <span {...props}>{date.getDate()}</span>
                          {renderDay(date)}
                        </div>
                      )
                    }}
                    onDayClick={(date) => {
                      const eventsForDay = getEventsForDate(date);
                      if (eventsForDay.length > 0) {
                        setSelectedDate(date);
                        selectedView === 'month' && setSelectedView('day');
                      } else {
                        setSelectedDate(date);
                        handleAddEvent(date);
                      }
                    }}
                  />
                </TabsContent>

                <TabsContent value="week" className="animate-fade-in">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">
                      {selectedDate ? `Week of ${format(selectedDate, 'PP')}` : 'Week View'}
                    </h2>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          const newDate = new Date(selectedDate!);
                          newDate.setDate(newDate.getDate() - 7);
                          setSelectedDate(newDate);
                        }}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          const newDate = new Date(selectedDate!);
                          newDate.setDate(newDate.getDate() + 7);
                          setSelectedDate(newDate);
                        }}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setSelectedDate(new Date())}
                      >
                        This Week
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-7 gap-1">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                      <div key={day} className="text-center font-medium p-2">
                        {day}
                      </div>
                    ))}
                    
                    {getWeekDays(selectedDate || new Date()).map((day) => {
                      const eventsForDay = getEventsForDate(day);
                      const isToday = isSameDay(day, new Date());
                      
                      return (
                        <div 
                          key={day.toString()} 
                          className={cn(
                            "min-h-[120px] border rounded-md p-2 overflow-auto",
                            isToday && "bg-primary/5 border-primary"
                          )}
                        >
                          <div className="text-center font-medium mb-1">
                            {format(day, 'd')}
                          </div>
                          
                          {eventsForDay.map((event) => (
                            <div 
                              key={event.id}
                              className="text-xs mb-1 p-1 rounded truncate cursor-pointer hover:bg-accent"
                              style={{ backgroundColor: `${event.color}20`, borderLeft: `3px solid ${event.color}` }}
                              onClick={() => setSelectedEvent(event)}
                            >
                              {event.startTime && (
                                <span className="font-medium">{event.startTime} </span>
                              )}
                              {event.title}
                            </div>
                          ))}
                          
                          <div 
                            className="text-center text-xs text-muted-foreground mt-1 cursor-pointer hover:text-primary"
                            onClick={() => handleAddEvent(day)}
                          >
                            {eventsForDay.length === 0 && "+ Add"}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </TabsContent>

                <TabsContent value="day" className="animate-fade-in">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">
                      {selectedDate ? format(selectedDate, 'EEEE, MMMM d, yyyy') : 'Day View'}
                    </h2>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          const newDate = new Date(selectedDate!);
                          newDate.setDate(newDate.getDate() - 1);
                          setSelectedDate(newDate);
                        }}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          const newDate = new Date(selectedDate!);
                          newDate.setDate(newDate.getDate() + 1);
                          setSelectedDate(newDate);
                        }}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setSelectedDate(new Date())}
                      >
                        Today
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {getEventsForDate(selectedDate || new Date()).length > 0 ? (
                      getEventsForDate(selectedDate || new Date())
                        .sort((a, b) => {
                          if (!a.startTime) return 1;
                          if (!b.startTime) return -1;
                          return a.startTime.localeCompare(b.startTime);
                        })
                        .map((event) => (
                          <Card 
                            key={event.id} 
                            className={cn(
                              "hover:shadow-md transition-shadow cursor-pointer",
                              event.recurring && "border-l-4"
                            )}
                            style={{ 
                              borderLeftColor: event.recurring ? event.color : undefined,
                              borderLeftWidth: event.recurring ? '4px' : undefined
                            }}
                            onClick={() => setSelectedEvent(event)}
                          >
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start">
                                <div className="flex items-center">
                                  <div 
                                    className="h-8 w-8 rounded-full mr-3 flex items-center justify-center text-white"
                                    style={{ backgroundColor: event.color || '#4caf50' }}
                                  >
                                    {getEventIcon(event.type)}
                                  </div>
                                  
                                  <div>
                                    <h3 className="font-medium">{event.title}</h3>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                      {event.startTime && (
                                        <span className="flex items-center">
                                          <Clock className="h-3 w-3 mr-1" />
                                          {event.startTime} - {event.endTime}
                                        </span>
                                      )}
                                      {event.location && (
                                        <span>• {event.location}</span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                
                                {getEventBadge(event.type)}
                              </div>
                              
                              {event.description && (
                                <p className="mt-2 text-sm text-muted-foreground">
                                  {event.description}
                                </p>
                              )}
                            </CardContent>
                          </Card>
                        ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground mb-4">No events scheduled for this day</p>
                        <Button onClick={() => handleAddEvent(selectedDate)}>
                          <Plus className="mr-2 h-4 w-4" />
                          Add Event
                        </Button>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="list" className="animate-fade-in">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">All Events</h2>
                    <Select
                      value={selectedDate ? format(selectedDate, 'yyyy-MM') : format(new Date(), 'yyyy-MM')}
                      onValueChange={(value) => {
                        const [year, month] = value.split('-').map(Number);
                        setSelectedDate(new Date(year, month - 1, 1));
                      }}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select month" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => {
                          const date = new Date(2025, i, 1);
                          return (
                            <SelectItem key={i} value={format(date, 'yyyy-MM')}>
                              {format(date, 'MMMM yyyy')}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-4">
                    {getEventsForMonth(selectedDate || new Date()).length > 0 ? (
                      (() => {
                        const eventsByDate: Record<string, Event[]> = {};
                        
                        // Group events by date string
                        getEventsForMonth(selectedDate || new Date())
                          .sort((a, b) => a.date.getTime() - b.date.getTime())
                          .forEach(event => {
                            const dateStr = format(event.date, 'yyyy-MM-dd');
                            if (!eventsByDate[dateStr]) {
                              eventsByDate[dateStr] = [];
                            }
                            eventsByDate[dateStr].push(event);
                          });
                        
                        // Now render each date group
                        return Object.entries(eventsByDate).map(([dateStr, events]) => (
                          <div key={dateStr} className="space-y-2">
                            <h3 className="font-medium border-b pb-2">
                              {format(new Date(events[0].date), 'EEEE, MMMM d, yyyy')}
                            </h3>
                            <div className="space-y-2 pl-4">
                              {events.map((event) => (
                                <div 
                                  key={event.id} 
                                  className="flex items-center justify-between p-2 rounded-md hover:bg-accent cursor-pointer"
                                  onClick={() => setSelectedEvent(event)}
                                >
                                  <div className="flex items-center">
                                    <div 
                                      className="h-6 w-6 rounded-full mr-3 flex items-center justify-center text-white"
                                      style={{ backgroundColor: event.color || '#4caf50' }}
                                    >
                                      {getEventIcon(event.type)}
                                    </div>
                                    <div>
                                      <p className="font-medium">{event.title}</p>
                                      <div className="flex items-center text-xs text-muted-foreground">
                                        {event.startTime && (
                                          <span>{event.startTime} - {event.endTime}</span>
                                        )}
                                        {event.location && (
                                          <span className="ml-2">• {event.location}</span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  
                                  {getEventBadge(event.type)}
                                </div>
                              ))}
                            </div>
                          </div>
                        ));
                      })()
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No events found for this month</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Upcoming Events</span>
                <Button size="sm" variant="ghost" onClick={() => setSelectedView('list')}>
                  <List className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {getUpcomingEvents().length > 0 ? (
                  getUpcomingEvents().map((event) => (
                    <div 
                      key={event.id} 
                      className="flex items-start space-x-2 p-2 rounded-md hover:bg-accent cursor-pointer"
                      onClick={() => setSelectedEvent(event)}
                    >
                      <div 
                        className="h-3 w-3 mt-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: event.color || '#4caf50' }}
                      />
                      <div className="space-y-1 flex-1 min-w-0">
                        <p className="font-medium truncate">{event.title}</p>
                        <div className="text-xs text-muted-foreground">
                          <p>{format(event.date, 'MMM d')}</p>
                          {event.startTime && (
                            <p>{event.startTime}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground text-sm py-4">
                    No upcoming events
                  </p>
                )}
                
                <Button 
                  variant="outline" 
                  className="w-full mt-2"
                  onClick={() => handleAddEvent()}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Event
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-primary/5">
            <CardHeader>
              <CardTitle>Pro Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Double-click on any day to quickly add an event</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Set recurring events for regular classes</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Export your calendar to share with students</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Sync with your LMS to import assignment deadlines</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Event Dialog for adding/editing events */}
      <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Event' : 'Add New Event'}</DialogTitle>
            <DialogDescription>
              {isEditing 
                ? 'Update your calendar event details.' 
                : 'Fill in the details for your new calendar event.'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">Title</label>
              <Input 
                id="title" 
                value={newEvent.title} 
                onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                placeholder="Event title"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="event-date" className="text-sm font-medium">Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="event-date"
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !newEvent.date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newEvent.date ? format(newEvent.date, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={newEvent.date}
                      onSelect={(date) => setNewEvent({...newEvent, date})}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="event-type" className="text-sm font-medium">Event Type</label>
                <Select 
                  value={newEvent.type} 
                  onValueChange={(value: any) => setNewEvent({...newEvent, type: value})}
                >
                  <SelectTrigger id="event-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="class">Class</SelectItem>
                    <SelectItem value="exam">Exam</SelectItem>
                    <SelectItem value="assignment">Assignment</SelectItem>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="reminder">Reminder</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="start-time" className="text-sm font-medium">Start Time</label>
                <Input 
                  id="start-time" 
                  type="time" 
                  value={newEvent.startTime || ''} 
                  onChange={(e) => setNewEvent({...newEvent, startTime: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="end-time" className="text-sm font-medium">End Time</label>
                <Input 
                  id="end-time" 
                  type="time" 
                  value={newEvent.endTime || ''} 
                  onChange={(e) => setNewEvent({...newEvent, endTime: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="location" className="text-sm font-medium">Location</label>
              <Input 
                id="location" 
                value={newEvent.location || ''} 
                onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                placeholder="Room number, building, or online"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <Textarea 
                id="description" 
                value={newEvent.description || ''} 
                onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                placeholder="Add any additional details"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="color" className="text-sm font-medium">Color</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="color" 
                    id="color"
                    value={newEvent.color || '#4caf50'} 
                    onChange={(e) => setNewEvent({...newEvent, color: e.target.value})}
                    className="h-10 w-10 p-0 border-none"
                  />
                  <span className="text-sm text-muted-foreground">Choose color label</span>
                </div>
              </div>
              
              <div className="space-y-2 flex items-center">
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="recurring"
                    checked={newEvent.recurring || false}
                    onChange={(e) => setNewEvent({...newEvent, recurring: e.target.checked})}
                    className="h-4 w-4"
                  />
                  <label htmlFor="recurring" className="text-sm font-medium">Recurring Event</label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="flex justify-between">
            {isEditing && (
              <Button 
                variant="destructive" 
                onClick={() => {
                  handleDeleteEvent(newEvent.id as string);
                  setShowEventDialog(false);
                }}
              >
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </Button>
            )}
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowEventDialog(false)}>Cancel</Button>
              <Button onClick={handleSaveEvent}>
                {isEditing ? (
                  <>
                    <Pencil className="mr-2 h-4 w-4" /> Update Event
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" /> Add Event
                  </>
                )}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Event Details Dialog */}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="sm:max-w-[500px]">
          {selectedEvent && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle className="flex items-center gap-2">
                    <div 
                      className="h-4 w-4 rounded-full"
                      style={{ backgroundColor: selectedEvent.color || '#4caf50' }}
                    />
                    {selectedEvent.title}
                  </DialogTitle>
                  {getEventBadge(selectedEvent.type)}
                </div>
                <DialogDescription>
                  {format(selectedEvent.date, 'EEEE, MMMM d, yyyy')}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                {(selectedEvent.startTime && selectedEvent.endTime) && (
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{selectedEvent.startTime} - {selectedEvent.endTime}</span>
                    {selectedEvent.recurring && (
                      <Badge variant="outline" className="ml-2">Recurring</Badge>
                    )}
                  </div>
                )}
                
                {selectedEvent.location && (
                  <div className="flex items-start">
                    <span className="text-muted-foreground mr-2">Location:</span>
                    <span>{selectedEvent.location}</span>
                  </div>
                )}
                
                {selectedEvent.description && (
                  <div className="pt-2">
                    <h4 className="text-sm font-medium mb-1">Description</h4>
                    <p className="text-muted-foreground text-sm">{selectedEvent.description}</p>
                  </div>
                )}
              </div>
              <DialogFooter>
                <div className="flex gap-2 w-full justify-between">
                  <Button 
                    variant="destructive" 
                    onClick={() => {
                      handleDeleteEvent(selectedEvent.id);
                      setSelectedEvent(null);
                    }}
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setSelectedEvent(null)}>Close</Button>
                    <Button onClick={() => {
                      handleEditEvent(selectedEvent);
                      setSelectedEvent(null);
                    }}>
                      <Pencil className="mr-2 h-4 w-4" /> Edit
                    </Button>
                  </div>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CalendarPage;
