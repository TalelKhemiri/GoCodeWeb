// src/data/quizData.tsx

export interface Question {
  id: number;
  image?: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface QuizModule {
  id: string;
  title: string;
  description: string;
  icon: string;
  questions: Question[];
}

export const QUIZ_DATA: QuizModule[] = [
  {
    id: "priority",
    title: "Priorité & Intersections",
    description: "Maîtrisez les règles de passage et les intersections.",
    icon: "ArrowLeftRight",
    questions: [
      {
        id: 11,
        image: "/assets/priority/rout11.png",
        question: "Dans quel ordre les véhicules passent-ils ?",
        options: ["Voiture Rouge, puis Bleue", "Voiture Bleue, puis Rouge", "Les deux en même temps"],
        correctAnswer: 0,
        explanation: "La voiture rouge est sur la voie principale (indiquée par le panneau). Elle passe en premier."
      },
      {
        id: 12,
        image: "/assets/priority/rout12.png",
        question: "Que signifie ce panneau ?",
        options: ["Céder le passage", "Arrêt absolu (STOP)", "Ralentir"],
        correctAnswer: 1,
        explanation: "Le panneau STOP impose l'arrêt absolu des roues à la limite de la chaussée."
      }
    ]
  },
  {
    id: "rules",
    title: "Règles de Circulation",
    description: "Positionnement, dépassement et vitesses.",
    icon: "BookOpen",
    questions: [
      {
        id: 21,
        image: "/assets/rules/rout21.png",
        question: "Le dépassement est-il autorisé ?",
        options: ["Oui", "Non", "Seulement pour les motos"],
        correctAnswer: 1,
        explanation: "La ligne continue interdit formellement tout dépassement."
      }
    ]
  },
  {
    id: "firstaid",
    title: "Secourisme",
    description: "Les gestes qui sauvent (PAS : Protéger, Alerter, Secourir).",
    icon: "HeartPulse",
    questions: [
      {
        id: 30,
        image: "/assets/firstaid/rout30.png",
        question: "Première action sur un accident ?",
        options: ["Alerter", "Secourir", "Protéger (Baliser)"],
        correctAnswer: 2,
        explanation: "Il faut d'abord PROTÉGER la zone pour éviter un sur-accident."
      }
    ]
  }
];