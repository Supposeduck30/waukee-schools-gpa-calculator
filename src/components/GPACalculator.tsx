
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Calculator, ChevronUp, ChevronDown } from 'lucide-react';
import { letterToGPA, getNextGrade, getPreviousGrade } from '@/utils/gpaConverter';

interface ClassGrade {
  id: number;
  name: string;
  letterGrade: string;
  gpa: number;
}

const GPACalculator = () => {
  const [numClasses, setNumClasses] = useState<number>(0);
  const [classes, setClasses] = useState<ClassGrade[]>([]);
  const [apClasses, setApClasses] = useState<number>(0);
  const [totalGPA, setTotalGPA] = useState<number>(0);

  const generateClasses = (count: number) => {
    const newClasses: ClassGrade[] = [];
    for (let i = 1; i <= count; i++) {
      newClasses.push({
        id: i,
        name: '',
        letterGrade: 'A',
        gpa: letterToGPA('A')
      });
    }
    setClasses(newClasses);
  };

  const updateNumClasses = (count: number) => {
    setNumClasses(count);
    if (count > 0) {
      generateClasses(count);
    } else {
      setClasses([]);
    }
  };

  const updateClassName = (id: number, name: string) => {
    setClasses(classes.map(cls => 
      cls.id === id ? { ...cls, name } : cls
    ));
  };

  const updateClassGrade = (id: number, letterGrade: string) => {
    const gpa = letterToGPA(letterGrade);
    setClasses(classes.map(cls => 
      cls.id === id ? { ...cls, letterGrade, gpa } : cls
    ));
  };

  const incrementGrade = (id: number) => {
    const cls = classes.find(c => c.id === id);
    if (cls) {
      const nextGrade = getNextGrade(cls.letterGrade);
      updateClassGrade(id, nextGrade);
    }
  };

  const decrementGrade = (id: number) => {
    const cls = classes.find(c => c.id === id);
    if (cls) {
      const prevGrade = getPreviousGrade(cls.letterGrade);
      updateClassGrade(id, prevGrade);
    }
  };

  const calculateTotalGPA = () => {
    if (classes.length === 0) return 0;
    
    const gpaTotal = classes.reduce((sum, cls) => sum + cls.gpa, 0);
    const apBonus = apClasses * 0.5;
    return (gpaTotal + apBonus) / classes.length;
  };

  useEffect(() => {
    setTotalGPA(calculateTotalGPA());
  }, [classes, apClasses]);

  const getGradeColor = (gpa: number) => {
    if (gpa >= 4.0) return 'bg-green-500';
    if (gpa >= 3.5) return 'bg-purple-400';
    if (gpa >= 3.0) return 'bg-yellow-500';
    if (gpa >= 2.0) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent mb-2">
            WCSD GPA Calculator
          </h1>
        </div>

        {/* Number of Classes Input */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Calculator className="h-5 w-5 text-purple-600" />
              Class Setup
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Label htmlFor="num-classes" className="text-sm font-medium">
                  How many classes have you taken?
                </Label>
                <Input
                  id="num-classes"
                  type="number"
                  min="0"
                  max="20"
                  value={numClasses}
                  onChange={(e) => updateNumClasses(parseInt(e.target.value) || 0)}
                  className="w-24"
                />
              </div>
              <div className="flex items-center gap-4">
                <Label htmlFor="ap-classes" className="text-sm font-medium">
                  How many of those were AP? (+0.5 bonus each):
                </Label>
                <Input
                  id="ap-classes"
                  type="number"
                  min="0"
                  max={numClasses}
                  value={apClasses}
                  onChange={(e) => setApClasses(Math.min(parseInt(e.target.value) || 0, numClasses))}
                  className="w-24"
                />
                {apClasses > 0 && (
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                    +{(apClasses * 0.5).toFixed(1)} bonus
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Classes Input */}
        {numClasses > 0 && (
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl">Enter Your Grades</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {classes.map((cls, index) => (
                <div key={cls.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1 space-y-3">
                    <div>
                      <Label htmlFor={`class-name-${cls.id}`} className="text-sm font-medium">
                        Class {index + 1} Name (optional):
                      </Label>
                      <Input
                        id={`class-name-${cls.id}`}
                        type="text"
                        value={cls.name}
                        onChange={(e) => updateClassName(cls.id, e.target.value)}
                        className="mt-1"
                        placeholder={`Class ${index + 1}`}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`class-grade-${cls.id}`} className="text-sm font-medium">
                        Letter Grade:
                      </Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => decrementGrade(cls.id)}
                          className="h-8 w-8 p-0"
                        >
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                        <Input
                          id={`class-grade-${cls.id}`}
                          type="text"
                          value={cls.letterGrade}
                          onChange={(e) => updateClassGrade(cls.id, e.target.value)}
                          className="w-20 text-center font-bold"
                          placeholder="A"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => incrementGrade(cls.id)}
                          className="h-8 w-8 p-0"
                        >
                          <ChevronUp className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-500 mb-1">GPA</div>
                    <Badge className={`${getGradeColor(cls.gpa)} text-white font-bold`}>
                      {cls.gpa.toFixed(2)}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {classes.length > 0 && (
          <Card className="shadow-lg border-0 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Your Total GPA</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">
                  {totalGPA.toFixed(3)}
                </div>
                <div className="text-purple-100 text-sm">
                  Based on {classes.length} classes
                  {apClasses > 0 && ` with ${apClasses} AP bonus${apClasses > 1 ? 'es' : ''}`}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default GPACalculator;
