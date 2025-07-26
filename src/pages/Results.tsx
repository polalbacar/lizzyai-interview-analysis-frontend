import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, ArrowLeft, Download, Share2 } from "lucide-react";

interface Question {
  question: string;
  answer: string;
  score: number;
  feedback: string;
}

interface ResultData {
  candidateName: string;
  role: string;
  fileName: string;
  processedAt: string;
}

const Results = () => {
  const navigate = useNavigate();
  const [resultData, setResultData] = useState<ResultData | null>(null);
  const [finalScore] = useState(78); // Mock final score

  // Mock questions and answers
  const [questions] = useState<Question[]>([
    {
      question: "Tell me about your experience with React and modern JavaScript frameworks.",
      answer: "I have been working with React for about 3 years now. I've built several production applications using React with TypeScript, and I'm familiar with hooks, context API, and state management libraries like Redux. I also have experience with Next.js for server-side rendering.",
      score: 85,
      feedback: "Strong technical knowledge demonstrated. Good understanding of modern React patterns."
    },
    {
      question: "Describe a challenging problem you solved in your previous role.",
      answer: "In my last project, we had a performance issue where our application was loading slowly. I identified that we were making too many API calls and implemented a caching strategy using React Query. This reduced load times by 40%.",
      score: 82,
      feedback: "Excellent problem-solving approach. Shows initiative and technical depth."
    },
    {
      question: "How do you handle working in a team environment?",
      answer: "I believe communication is key. I always make sure to participate actively in stand-ups and code reviews. I'm comfortable giving and receiving feedback, and I try to mentor junior developers when possible.",
      score: 75,
      feedback: "Good team collaboration skills. Could provide more specific examples."
    },
    {
      question: "Where do you see yourself in 5 years?",
      answer: "I want to continue growing as a developer and eventually move into a technical leadership role. I'm interested in architecture decisions and helping shape the technical direction of products.",
      score: 70,
      feedback: "Clear career aspirations. Shows ambition and forward thinking."
    }
  ]);

  useEffect(() => {
    const stored = localStorage.getItem('lizzy-result');
    if (stored) {
      setResultData(JSON.parse(stored));
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (!resultData) {
    return <div>Loading...</div>;
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "success";
    if (score >= 60) return "warning";
    return "destructive";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    return "Needs Improvement";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">LizzyAI</h1>
            </div>
            <Button variant="outline" onClick={() => navigate('/')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              New Analysis
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-6xl">
        {/* Header Info */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Interview Analysis Results</h1>
          <div className="flex flex-wrap gap-4 text-muted-foreground">
            <span><strong>Candidate:</strong> {resultData.candidateName}</span>
            <span><strong>Role:</strong> {resultData.role}</span>
            <span><strong>Processed:</strong> {new Date(resultData.processedAt).toLocaleString()}</span>
          </div>
        </div>

        {/* Final Score Card */}
        <Card className="mb-8 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="pt-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-primary/10 border-4 border-primary/20 mb-4">
                <span className="text-4xl font-bold text-primary">{finalScore}</span>
              </div>
              <h2 className="text-2xl font-bold mb-2">Overall Interview Score</h2>
              <Badge variant={getScoreColor(finalScore) as any} className="text-sm px-4 py-1">
                {getScoreBadge(finalScore)}
              </Badge>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                Based on AI analysis of responses, this candidate demonstrates strong technical skills 
                and good communication abilities with areas for growth in leadership examples.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button variant="outline">
            <Share2 className="mr-2 h-4 w-4" />
            Share Results
          </Button>
        </div>

        {/* Questions and Answers */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold mb-4">Question-by-Question Analysis</h3>
          {questions.map((q, index) => (
            <Card key={index} className="shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg leading-relaxed pr-4">
                    Q{index + 1}: {q.question}
                  </CardTitle>
                  <div className="text-right shrink-0">
                    <div className="text-2xl font-bold text-primary mb-1">{q.score}</div>
                    <Badge variant={getScoreColor(q.score) as any} className="text-xs">
                      {getScoreBadge(q.score)}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Candidate Response:</h4>
                  <p className="text-muted-foreground leading-relaxed bg-muted/30 p-4 rounded-lg">
                    "{q.answer}"
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">AI Feedback:</h4>
                  <p className="text-muted-foreground">{q.feedback}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Summary & Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-success mb-2">Strengths:</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Strong technical knowledge in React and modern JavaScript</li>
                  <li>Good problem-solving abilities with concrete examples</li>
                  <li>Clear communication and structured responses</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-warning mb-2">Areas for Improvement:</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Could provide more specific examples of team collaboration</li>
                  <li>Leadership experience could be better articulated</li>
                  <li>Career goals could be more detailed</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-primary mb-2">Recommendation:</h4>
                <p className="text-muted-foreground">
                  <strong>Proceed to next round.</strong> Candidate shows strong technical competency 
                  and good communication skills. Consider follow-up questions about leadership 
                  experience and specific project examples.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Results;