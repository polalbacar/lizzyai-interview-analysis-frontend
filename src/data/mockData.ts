export const harryMockData = {
  "timestamp": "2025-07-27T22:58:06.871737",
  "candidate_name": "Harry",
  "api_response": {
    "candidate": "Harry",
    "role": "Software Engineer",
    "final_fraud_score": 29,
    "questions": [
      {
        "question": "Could you walk me through how you design and iterate on a reinforcement learning policy for a new humanoid manipulation task, from problem definition through to deployment on physical hardware? What metrics guide each stage?",
        "answer": "Well, I'm pretty new in this field and I can't give you really an exact answer, but I'm looking forward to learn more and find out what to do. I would ask the people who are already involved in the problem what the basic definition is and how we could set up the robot.",
        "fraud_score": 15,
        "insights": {
          "reading_aloud": false,
          "external_help": false,
          "scripted_content": false,
          "confidence_level": "low",
          "details": "The response is informal and lacks technical depth, which is consistent with the candidate's admission of being new to the field. There are no signs of unnatural speech patterns, sudden improvements, or overly polished language. The answer is straightforward and lacks any indicators of external help or scripted content."
        }
      },
      {
        "question": "When building a training pipeline across IsaacSim and MujaCo, how do you handle fidelity gaps and ensure policies transfer successfully to real robots?",
        "answer": "I have absolutely no idea.",
        "fraud_score": 5,
        "insights": {
          "reading_aloud": false,
          "external_help": false,
          "scripted_content": false,
          "confidence_level": "high",
          "details": "The response 'I have absolutely no idea.' is a straightforward admission of lack of knowledge. It does not exhibit any signs of reading aloud, external help, or scripted content. The language is informal and direct, with no attempt to use technical jargon or polished language. This suggests a natural and authentic response."
        }
      },
      {
        "question": "Do you hold a completed MSc or PhD in robotics, computer science, artificial intelligence, or a closely related field?",
        "answer": "No.",
        "fraud_score": 10,
        "insights": {
          "reading_aloud": false,
          "external_help": false,
          "scripted_content": false,
          "confidence_level": "high",
          "details": "The response is a simple 'No', which does not exhibit any signs of reading aloud, external help, or scripted content. It is a straightforward and natural answer to the question asked."
        }
      },
      {
        "question": "Are you available to commit to a full-time position?",
        "answer": "Yes, I am.",
        "fraud_score": 10,
        "insights": {
          "reading_aloud": false,
          "external_help": false,
          "scripted_content": false,
          "confidence_level": "high",
          "details": "The response is concise and directly answers the question without any indicators of fraud. It lacks any unnatural speech patterns, overly polished language, or signs of external help. The simplicity of the answer suggests authenticity."
        }
      },
      {
        "question": "Are you able to work remotely or in a hybrid arrangement with occasional travel to Pischelsdorf, Austria for hardware integration and testing?",
        "answer": "Yes, of course.",
        "fraud_score": 45,
        "insights": {
          "reading_aloud": true,
          "external_help": false,
          "scripted_content": true,
          "confidence_level": "medium",
          "details": "The response 'Yes, of course.' is overly smooth and lacks typical speech disfluencies, suggesting reading aloud. It is also a generic response that does not specifically address the question, indicating scripted content. However, there is no evidence of external help as the response is too brief to assess inconsistency in vocabulary or technical depth."
        }
      },
      {
        "question": "Could you tell me about a time you partnered closely with mechanical and electrical engineers to solve a robotics problem? What was the situation, what role did you play, and how did you align across disciplines?",
        "answer": "So one instance that stands out was during a robotics project where we were developing an autonomous mobile robot for warehouse logistics. The main challenge was achieving reliable object detection and pick and place position while keeping the robot lightweight and energy efficient. The mechanical engineers were focused on optimizing the arm structure and the drivetrain to reduce weight, while the electrical engineer was designing a custom PCBs and power distribution to manage multiple sensors and motor efficiency. I was software lead responsible for the perception, motion planning, and control algorithms. The turning point came when I noticed misalignment between the control system expectations and the arm's physical behavior. It became clear that the kinematic assumptions in our software didn't fully match the hardware reliability due to mechanically flex and actuator lag. To solve this, I coordinated closely with the mechanical and electrical teams to adjust the control algorithms and refine the kinematic models. We conducted joint testing sessions to iterate on these adjustments, ensuring the software and hardware were in sync. This collaboration led to a significant improvement in the robot's performance and efficiency. What happened afterward was a successful deployment in the warehouse, meeting our project goals.",
        "fraud_score": 45,
        "insights": {
          "reading_aloud": false,
          "external_help": false,
          "scripted_content": true,
          "confidence_level": "medium",
          "details": "The response is highly polished with perfect grammar and structure, which is unusual for a spontaneous spoken answer. The language is formal and includes technical jargon and buzzwords typical of online templates or job interview guides. However, there is no clear evidence of reading aloud or external help, as the response maintains consistent technical depth and vocabulary throughout."
        }
      },
      {
        "question": "Describe an instance where project requirements changed rapidly in the middle of development. How did you adjust your plans and keep progress on track?",
        "answer": "One notable instance was during a drone navigation project where we were developing autonomous flight capabilities for indoor environments. Midway through the development, after several sprints focused on SLAM and path planning, the client revised the requirements. They now wanted the drone to operate in GPS-denied dynamic environments with moving obstacles, not just static maps. This significantly impacted both our perception and the control modules.",
        "fraud_score": 45,
        "insights": {
          "reading_aloud": false,
          "external_help": true,
          "scripted_content": true,
          "confidence_level": "medium",
          "details": "The response contains technical depth and specific terminology that may be beyond the typical knowledge level of a candidate without external help. The language is polished and formal, suggesting possible scripted content. However, there are no clear indicators of reading aloud, such as unnatural speech patterns or mechanical tone. The use of specific project details reduces the likelihood of a generic response, but the overall delivery is unusually smooth and well-structured for a spontaneous spoken answer."
        }
      },
      {
        "question": "Could you elaborate on how you adjusted your plans and kept progress on track after the requirement changes?",
        "answer": "Absolutely. Once the requirements shifted to include dynamic environments, I knew we had to rethink both our technical approach and our timeline. We reprioritized the backlog. We refactored the roadmap to modular milestones. We increased feedback loops and cross-functional pairing. Through those adjustments, we maintained momentum, avoided burnout, and delivered a demo-ready prototype under the new specs. It reinforced for me how critical it is to stay transparent, acceptive, and disciplined when the ground shifts mid-project.",
        "fraud_score": 55,
        "insights": {
          "reading_aloud": true,
          "external_help": false,
          "scripted_content": true,
          "confidence_level": "medium",
          "details": "The response exhibits overly smooth delivery and lacks typical speech disfluencies, indicating potential reading aloud. The language is polished and formal, with perfect grammar and structure, suggesting scripted content. The use of buzzwords and a structured approach is typical of online templates. However, there is no clear evidence of external help as the response maintains consistent technical depth."
        }
      }
    ]
  }
}; 