
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Sparkles, BookOpen, GraduationCap, Atom, Rocket, Zap, Brain, FlaskConical, Microscope } from 'lucide-react';
import { motion } from 'framer-motion';

const SemesterSelector: React.FC = () => {
  const [selectedSemester, setSelectedSemester] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const semesters = [
    { id: "1", name: "1st Semester", icon: BookOpen, color: "bg-pink-500", hoverColor: "hover:bg-pink-600", delay: 0 },
    { id: "2", name: "2nd Semester", icon: GraduationCap, color: "bg-purple-500", hoverColor: "hover:bg-purple-600", delay: 0.1 },
    { id: "3", name: "3rd Semester", icon: Atom, color: "bg-blue-500", hoverColor: "hover:bg-blue-600", delay: 0.2 },
    { id: "4", name: "4th Semester", icon: Rocket, color: "bg-indigo-500", hoverColor: "hover:bg-indigo-600", delay: 0.3 },
    { id: "5", name: "5th Semester", icon: Zap, color: "bg-teal-500", hoverColor: "hover:bg-teal-600", delay: 0.4 },
    { id: "6", name: "6th Semester", icon: Brain, color: "bg-green-500", hoverColor: "hover:bg-green-600", delay: 0.5 },
    { id: "7", name: "7th Semester", icon: FlaskConical, color: "bg-yellow-500", hoverColor: "hover:bg-yellow-600", delay: 0.6 },
    { id: "8", name: "8th Semester", icon: Microscope, color: "bg-red-500", hoverColor: "hover:bg-red-600", delay: 0.7 },
  ];

  const handleSemesterSelect = (semesterId: string) => {
    setSelectedSemester(semesterId);
    setIsLoading(true);
    
    // Save selected semester to session storage
    sessionStorage.setItem('currentSemester', semesterId);
    
    // Simulate loading for demonstration
    setTimeout(() => {
      toast({
        title: "Semester selected",
        description: `You are now managing ${semesters.find(sem => sem.id === semesterId)?.name}`,
      });
      navigate('/');
    }, 800);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    },
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      transition: { type: 'spring', stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.98 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-edu-light via-white to-edu-gray-light flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl p-6"
      >
        <Card className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border-none">
          <CardHeader className="pb-3 text-center">
            <motion.div 
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
              className="flex justify-center mb-4"
            >
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-edu-primary to-edu-accent flex items-center justify-center text-white">
                <Sparkles className="h-8 w-8" />
              </div>
            </motion.div>
            <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-edu-primary to-edu-accent">
              Choose Your Semester
            </CardTitle>
            <CardDescription className="text-base">
              Select the semester you'd like to explore and manage
            </CardDescription>
          </CardHeader>

          <CardContent>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
            >
              {semesters.map((semester) => {
                const SemesterIcon = semester.icon;
                return (
                  <motion.div
                    key={semester.id}
                    variants={itemVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => handleSemesterSelect(semester.id)}
                    className={`cursor-pointer rounded-xl ${semester.color} text-white p-6 flex flex-col items-center justify-center transition-all duration-300 ease-out ${semester.hoverColor} transform`}
                    style={{ 
                      minHeight: '160px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                    }}
                  >
                    <SemesterIcon className="h-10 w-10 mb-3" />
                    <h3 className="font-bold text-lg">{semester.name}</h3>
                    <motion.div
                      initial={{ width: 0 }}
                      whileHover={{ width: '80%' }}
                      className="h-1 bg-white/50 mt-3 rounded-full"
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          </CardContent>
          
          <CardFooter className="pt-4 flex justify-center">
            <p className="text-sm text-gray-500 text-center max-w-md">
              Each semester's data is isolated, allowing you to manage courses and students independently.
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default SemesterSelector;
