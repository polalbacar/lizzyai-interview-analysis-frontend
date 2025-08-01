import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Upload as UploadIcon, Mic, CheckCircle, Users, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { harryMockData } from "@/data/mockData";

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [candidateName, setCandidateName] = useState("");
  const [role, setRole] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageVisible, setMessageVisible] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  const processingMessages = [
    "AI is analyzing the conversation...",
    "Starting transcription...",
    "Transcription completed...",
    "Segmenting transcript into Q&A pairs...",
    "Analyzing and scoring answers..."
  ];

  useEffect(() => {
    if (isProcessing) {
      let messageIndex = 0;
      setCurrentMessage(processingMessages[0]);
      setMessageVisible(true);
      
      const interval = setInterval(() => {
        // Fade out current message
        setMessageVisible(false);
        
        setTimeout(() => {
          // Change message and fade in
          messageIndex = (messageIndex + 1) % processingMessages.length;
          setCurrentMessage(processingMessages[messageIndex]);
          setMessageVisible(true);
        }, 300); // Wait for fade out to complete
        
      }, 2500); // Change message every 2.5 seconds

      return () => clearInterval(interval);
    }
  }, [isProcessing]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !candidateName || !role) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields and upload an audio file.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      // Create FormData for API call
      const formData = new FormData();
      formData.append('audio_file', file);
      formData.append('candidate_name', candidateName);
      formData.append('role', role);

      // Call the real API endpoint
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/api/v1/process-interview`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`API call failed: ${response.status}`);
      }

      const result = await response.json();
      
      // Log API response for debugging
      console.log('API Response Status:', response.status);
      console.log('API Response Headers:', Object.fromEntries(response.headers));
      console.log('API Response Data:', result);
      
      // Store API result in localStorage
      localStorage.setItem('lizzy-result', JSON.stringify({
        ...result,
        fileName: file.name,
        processedAt: new Date().toISOString()
      }));
      
      console.log('Stored result in localStorage:', {
        ...result,
        fileName: file.name,
        processedAt: new Date().toISOString()
      });
      
      navigate('/results');
    } catch (error) {
      console.error('Error processing interview:', error);
      toast({
        title: "Processing Error",
        description: "Failed to process the interview. Please try again.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  const handleMockSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !candidateName || !role) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields and upload an audio file.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    // Mock processing time
    setTimeout(() => {
      // Transform Harry's mock data to match expected format
      const transformedData = {
        candidate: harryMockData.api_response.candidate,
        role: harryMockData.api_response.role,
        final_fraud_score: harryMockData.api_response.final_fraud_score,
        questions: harryMockData.api_response.questions,
        fileName: file.name,
        processedAt: harryMockData.timestamp
      };
      
      // Store mock data in localStorage
      localStorage.setItem('lizzy-result', JSON.stringify(transformedData));
      
      navigate('/results');
    }, 3000);
  };

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-8 pb-8">
            <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold mb-2">Processing Interview</h3>
            <p className={`text-muted-foreground transition-opacity duration-300 ease-in-out ${
              messageVisible ? 'opacity-100' : 'opacity-0'
            }`}>
              {currentMessage}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">LizzyAI</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            AI-Powered Interview
            <span className="text-primary block">Analysis</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Upload interview recordings and get instant AI-driven candidate evaluation with detailed insights and scoring.
          </p>
        </div>

        {/* Upload Form */}
        <Card className="max-w-2xl mx-auto shadow-lg mb-16">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Upload Interview Recording</CardTitle>
            <CardDescription>
              Upload an audio file along with candidate details to begin AI analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="candidateName">Candidate Name</Label>
                  <Input
                    id="candidateName"
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    placeholder="Enter candidate name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Software Engineer"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="audioFile">Interview Recording</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                  <input
                    id="audioFile"
                    type="file"
                    accept="audio/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="audioFile" className="cursor-pointer">
                    {file ? (
                      <div className="flex items-center justify-center space-x-2 text-primary">
                        <CheckCircle className="h-5 w-5" />
                        <span>{file.name}</span>
                      </div>
                    ) : (
                      <div>
                        <UploadIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground mb-2">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Supports MP3, WAV, M4A files
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <div className="space-y-3">
                <Button type="submit" className="w-full" size="lg">
                  <Brain className="mr-2 h-4 w-4" />
                  Analyze Interview
                </Button>
                
                <Button 
                  type="button" 
                  variant="secondary" 
                  className="w-full" 
                  size="lg"
                  onClick={handleMockSubmit}
                >
                  <Brain className="mr-2 h-4 w-4" />
                  Analyze Interview (Mock data)
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-card p-6 rounded-lg border shadow-sm text-center">
            <Mic className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Speech Analysis</h3>
            <p className="text-sm text-muted-foreground">Advanced speech-to-text and conversation analysis</p>
          </div>
          <div className="bg-card p-6 rounded-lg border shadow-sm text-center">
            <BarChart3 className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">AI Scoring</h3>
            <p className="text-sm text-muted-foreground">Intelligent evaluation with detailed question breakdown</p>
          </div>
          <div className="bg-card p-6 rounded-lg border shadow-sm text-center">
            <Users className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Candidate Insights</h3>
            <p className="text-sm text-muted-foreground">Comprehensive candidate assessment and recommendations</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;