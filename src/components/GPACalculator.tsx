
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Calculator } from 'lucide-react';
import { convertToGPA } from '@/utils/gpaConverter';

interface ClassGrade {
  id: number;
  name: string;
  percentage: number;
  gpa: number;
}

const GPACalculator = () => {
  const [classes, setClasses] = useState<ClassGrade[]>([]);
  const [apClasses, setApClasses] = useState<number>(0);
  const [totalGPA, setTotalGPA] = useState<number>(0);
  const [nextId, setNextId] = useState<number>(1);

  const addClass = () => {
    setClasses([...classes, { id: nextId, name: '', percentage: 0, gpa: 0 }]);
    setNextId(nextId + 1);
  };

  const removeClass = (id: number) => {
    setClasses(classes.filter(cls => cls.id !== id));
  };

  const updateClassName = (id: number, name: string) => {
    setClasses(classes.map(cls => 
      cls.id === id ? { ...cls, name } : cls
    ));
  };

  const updateClassPercentage = (id: number, percentage: number) => {
    const gpa = convertToGPA(percentage);
    setClasses(classes.map(cls => 
      cls.id === id ? { ...cls, percentage, gpa } : cls
    ));
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
    if (gpa >= 3.5) return 'bg-blue-500';
    if (gpa >= 3.0) return 'bg-yellow-500';
    if (gpa >= 2.0) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            WCSD GPA Calculator
          </h1>
        </div>

        {/* AP Classes Input */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Calculator className="h-5 w-5 text-blue-600" />
              AP Classes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Label htmlFor="ap-classes" className="text-sm font-medium">
                Number of AP Classes (+0.5 bonus each):
              </Label>
              <Input
                id="ap-classes"
                type="number"
                min="0"
                value={apClasses}
                onChange={(e) => setApClasses(parseInt(e.target.value) || 0)}
                className="w-24"
              />
              {apClasses > 0 && (
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                  +{(apClasses * 0.5).toFixed(1)} bonus
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Classes Input */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="text-xl">Your Classes</span>
              <Button onClick={addClass} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Class
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {classes.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Calculator className="h-12 w-12 mx-auto mb-4 opacity-30" />
                <p>No classes added yet. Click "Add Class" to get started!</p>
              </div>
            ) : (
              classes.map((cls, index) => (
                <div key={cls.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1 space-y-3">
                    <div>
                      <Label htmlFor={`class-name-${cls.id}`} className="text-sm font-medium">
                        Class Name:
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
                      <Label htmlFor={`class-percentage-${cls.id}`} className="text-sm font-medium">
                        Percentage:
                      </Label>
                      <Input
                        id={`class-percentage-${cls.id}`}
                        type="number"
                        min="0"
                        max="100"
                        step="0.1"
                        value={cls.percentage || ''}
                        onChange={(e) => updateClassPercentage(cls.id, parseFloat(e.target.value) || 0)}
                        className="mt-1"
                        placeholder="Enter percentage (0-100)"
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-500 mb-1">GPA</div>
                    <Badge className={`${getGradeColor(cls.gpa)} text-white font-bold`}>
                      {cls.gpa.toFixed(2)}
                    </Badge>
                  </div>
                  <Button
                    onClick={() => removeClass(cls.id)}
                    variant="destructive"
                    size="sm"
                    className="shrink-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Results */}
        <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Your Total GPA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">
                {totalGPA.toFixed(3)}
              </div>
              {classes.length > 0 && (
                <div className="text-blue-100 text-sm">
                  Based on {classes.length} classes
                  {apClasses > 0 && ` with ${apClasses} AP bonus${apClasses > 1 ? 'es' : ''}`}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Grade Scale Reference */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl">Grade Scale Reference</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div className="flex justify-between p-2 bg-green-50 rounded">
                <span>98-100%</span>
                <span className="font-bold">4.33</span>
              </div>
              <div className="flex justify-between p-2 bg-green-50 rounded">
                <span>93-97%</span>
                <span className="font-bold">4.00</span>
              </div>
              <div className="flex justify-between p-2 bg-blue-50 rounded">
                <span>90-92%</span>
                <span className="font-bold">3.67</span>
              </div>
              <div className="flex justify-between p-2 bg-blue-50 rounded">
                <span>87-89%</span>
                <span className="font-bold">3.33</span>
              </div>
              <div className="flex justify-between p-2 bg-yellow-50 rounded">
                <span>83-86%</span>
                <span className="font-bold">3.00</span>
              </div>
              <div className="flex justify-between p-2 bg-yellow-50 rounded">
                <span>80-82%</span>
                <span className="font-bold">2.67</span>
              </div>
              <div className="flex justify-between p-2 bg-orange-50 rounded">
                <span>77-79%</span>
                <span className="font-bold">2.33</span>
              </div>
              <div className="flex justify-between p-2 bg-orange-50 rounded">
                <span>73-76%</span>
                <span className="font-bold">2.00</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GPACalculator;
