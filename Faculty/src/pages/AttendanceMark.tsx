
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Search, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock student data
const mockStudents = [
  { id: "1", usn: "1XX21CS001", name: "Aditya Sharma" },
  { id: "2", usn: "1XX21CS002", name: "Bhavya Patel" },
  { id: "3", usn: "1XX21CS003", name: "Chetan Kumar" },
  { id: "4", usn: "1XX21CS004", name: "Divya Rao" },
  { id: "5", usn: "1XX21CS005", name: "Esha Singh" },
  { id: "6", usn: "1XX21CS006", name: "Farhan Ahmed" },
  { id: "7", usn: "1XX21CS007", name: "Gitika Verma" },
  { id: "8", usn: "1XX21CS008", name: "Harsh Gupta" },
  { id: "9", usn: "1XX21CS009", name: "Ishita Reddy" },
  { id: "10", usn: "1XX21CS010", name: "Jayesh Patel" },
];

const AttendanceMark: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [attendance, setAttendance] = useState<Record<string, boolean>>(
    mockStudents.reduce((acc, student) => ({ ...acc, [student.id]: true }), {})
  );
  
  // Get subject details from navigation state
  const { subjectId, subjectName, subjectCode } = location.state || {};
  
  if (!subjectId) {
    // Redirect back to workspace if no subject selected
    navigate('/workspace');
    return null;
  }
  
  const filteredStudents = mockStudents.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.usn.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleToggleAll = (checked: boolean) => {
    const newAttendance = { ...attendance };
    filteredStudents.forEach(student => {
      newAttendance[student.id] = checked;
    });
    setAttendance(newAttendance);
  };
  
  const presentCount = Object.values(attendance).filter(Boolean).length;
  const absentCount = mockStudents.length - presentCount;
  const attendancePercentage = Math.round((presentCount / mockStudents.length) * 100);
  
  const handleSaveAttendance = () => {
    // In a real app, this would save to a database
    toast({
      title: "Attendance saved",
      description: `Saved attendance for ${subjectCode}: ${presentCount} present, ${absentCount} absent.`,
    });
    navigate(`/workspace/${subjectId}`);
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate(`/workspace/${subjectId}`)}
            className="mb-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Subject
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Attendance</h1>
            <p className="text-muted-foreground">{subjectCode} - {subjectName}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-2xl font-bold">{attendancePercentage}%</div>
            <div className="text-sm text-muted-foreground">Present Today</div>
          </div>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Mark Attendance</CardTitle>
          <CardDescription>Today's Date: {new Date().toLocaleDateString()}</CardDescription>
          <div className="mt-4 flex gap-2 justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleToggleAll(true)}
              >
                Mark All Present
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleToggleAll(false)}
              >
                Mark All Absent
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto rounded-md border">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-xs uppercase">
                <tr>
                  <th scope="col" className="px-4 py-3 w-12">
                    <Checkbox 
                      checked={filteredStudents.length > 0 && filteredStudents.every(student => attendance[student.id])}
                      onCheckedChange={(checked) => handleToggleAll(!!checked)}
                    />
                  </th>
                  <th scope="col" className="px-4 py-3">USN</th>
                  <th scope="col" className="px-4 py-3">Student Name</th>
                  <th scope="col" className="px-4 py-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-8">
                      <p className="text-muted-foreground">No students found matching your search.</p>
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student) => (
                    <tr key={student.id} className="bg-white border-b">
                      <td className="px-4 py-3">
                        <Checkbox 
                          checked={attendance[student.id] || false}
                          onCheckedChange={(checked) => {
                            setAttendance({ ...attendance, [student.id]: !!checked });
                          }}
                        />
                      </td>
                      <td className="px-4 py-3 font-medium">{student.usn}</td>
                      <td className="px-4 py-3">{student.name}</td>
                      <td className="px-4 py-3 text-right">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          attendance[student.id] ? 
                            'bg-green-100 text-green-800' : 
                            'bg-red-100 text-red-800'
                        }`}>
                          {attendance[student.id] ? 'Present' : 'Absent'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleSaveAttendance}>
            <Save className="mr-2 h-4 w-4" />
            Save Attendance
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AttendanceMark;
