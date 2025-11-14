// Unified questionnaire configuration
// This file contains all questions and their flow logic
//
// HOW TO ADD NEW QUESTIONS:
//
// 1. Radio question with conditional text input:
// {
//   id: "q20",
//   type: "radio",
//   text: "Your question text?",
//   options: [
//     { label: "Option 1", next: "q21" },
//     {
//       label: "Option 2 - needs details",
//       next: "q21",
//       requiresTextInput: true,
//       textInputConfig: {
//         type: "textarea", // or "text"
//         placeholder: "Enter details here",
//         label: "Additional Details",
//       },
//     },
//   ],
// },
//
// 2. Direct text input question:
// {
//   id: "q21",
//   type: "text", // or "textarea" or "date"
//   text: "What is your value?",
//   inputConfig: {
//     type: "text",
//     placeholder: "Enter value",
//   },
//   next: "q22",
// },
//
// 3. Phone and Zip form:
// {
//   id: "contact-info",
//   type: "phone-zip",
//   text: "Contact Information",
//   next: "q23",
// },

export type QuestionType = "radio" | "text" | "textarea" | "date" | "phone-zip" | "special" | "medication-list" | "product-selection" | "dosage-selection" | "shipping-address" | "checkout";

export interface QuestionOption {
  label: string;
  next: string; // Question ID or special route like "/testimonial"
  requiresTextInput?: boolean; // If true, show text input after selecting this option
  textInputConfig?: {
    type: "text" | "textarea";
    placeholder: string;
    label?: string;
  };
}

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  options?: QuestionOption[]; // For radio questions
  inputConfig?: {
    // For direct input questions (text, textarea, date, phone-zip)
    type: "text" | "textarea" | "date" | "phone" | "zip" | "blood-pressure";
    placeholder: string;
    label?: string;
    validation?: (value: string) => boolean;
  };
  next?: string; // Default next question after input
  specialComponent?: "testimonial"; // For special pages like testimonial
}

export const questions: Question[] = [
  {
    id: "q1",
    type: "radio",
    text: "What's Most Important for Your Performance?",
    options: [
      { label: "Getting hard when I want", next: "q2" },
      { label: "Staying hard long enough to have great sex", next: "q2" },
      { label: "Both", next: "q2" },
    ],
  },
  {
    id: "q2",
    type: "radio",
    text: "Want the Benefits of Both Generic Viagra & Generic Cialis in One Treatment?",
    options: [
      { label: "Of Course", next: "testimonial" },
      { label: "Maybe", next: "testimonial" },
    ],
  },
  {
    id: "testimonial",
    type: "special",
    specialComponent: "testimonial",
    text: "You're one step closer to feeling confident.",
    next: "birthday",
  },
  {
    id: "birthday",
    type: "date",
    text: "When were you born?",
    inputConfig: {
      type: "date",
      placeholder: "Select your birthday",
    },
    next: "q5",
  },
  {
    id: "q5",
    type: "radio",
    text: "Sex assigned at birth…",
    options: [
      { label: "Male", next: "basics" },
      { label: "Female", next: "basics" },
    ],
  },
  {
    id: "basics",
    type: "phone-zip",
    text: "Basics",
    inputConfig: {
      type: "phone",
      placeholder: "Phone",
    },
    next: "q7",
  },
  {
    id: "q7",
    type: "radio",
    text: "Do you ever have a problem getting or maintaining an erection that is rigid enough for sex?",
    options: [
      { label: "Yes - every time", next: "q8" },
      { label: "Yes - more than half the time", next: "q8" },
      { label: "Yes - on occasion", next: "q8" },
      { label: "Yes - but rarely", next: "q8" },
      { label: "I never have a problem getting or maintaining an erection for as long as I want", next: "q8" },
    ],
  },
  {
    id: "q8",
    type: "radio",
    text: "Do you get erections…",
    options: [
      { label: "When you wake up", next: "q9" },
      { label: "Other times", next: "q9" },
      { label: "Neither", next: "q9" },
    ],
  },
  {
    id: "q9",
    type: "radio",
    text: "Have you ever been formally treated for ED or tried any medicines, vitamins, or supplements to treat it?",
    options: [
      {
        label: "Yes",
        next: "treatment-details",
        requiresTextInput: true,
        textInputConfig: {
          type: "textarea",
          placeholder: "Please provide any details related to the treatment, dosage and effectiveness",
          label: "Treatment Details",
        },
      },
      { label: "No", next: "q11" },
    ],
  },
  {
    id: "treatment-details",
    type: "textarea",
    text: "Please provide any details related to the treatment, dosage and effectiveness",
    inputConfig: {
      type: "textarea",
      placeholder: "Leave a Description",
    },
    next: "q12",
  },
  {
    id: "q11",
    type: "radio",
    text: "Did you experience any side effects from your treatments for ED?",
    options: [
      { label: "No, never had any side effects", next: "q13" },
      {
        label: "Yes",
        next: "side-effects",
        requiresTextInput: true,
        textInputConfig: {
          type: "textarea",
          placeholder: "Please explain any side effects you experienced",
          label: "Side Effects",
        },
      },
    ],
  },
  {
    id: "side-effects",
    type: "textarea",
    text: "Please explain any side effects you experienced",
    inputConfig: {
      type: "textarea",
      placeholder: "Leave a Description",
    },
    next: "q13",
  },
  {
    id: "q12",
    type: "radio",
    text: "Did you experience any side effects from your treatments for ED?",
    options: [
      { label: "No, never had any side effects", next: "q13" },
      {
        label: "Yes",
        next: "side-effects",
        requiresTextInput: true,
        textInputConfig: {
          type: "textarea",
          placeholder: "Please explain any side effects you experienced",
          label: "Side Effects",
        },
      },
    ],
  },
  {
    id: "q13",
    type: "radio",
    text: "Have you had a physical exam with a healthcare provider in the past 5 years?",
    options: [
      { label: "Yes, I am in good health", next: "q14" },
      {
        label: "Yes, but they found problems",
        next: "physical-exam-issues",
        requiresTextInput: true,
        textInputConfig: {
          type: "textarea",
          placeholder: "Please explain any issues during your last physical exam",
          label: "Physical Exam Issues",
        },
      },
      { label: "No", next: "q14" },
    ],
  },
  {
    id: "physical-exam-issues",
    type: "textarea",
    text: "Please explain any issues during your last physical exam",
    inputConfig: {
      type: "textarea",
      placeholder: "Leave a Description",
    },
    next: "q14",
  },
  {
    id: "q14",
    type: "radio",
    text: "Was your blood pressure taken in the past year?",
    options: [
      {
        label: "Yes",
        next: "blood-pressure",
        requiresTextInput: true,
        textInputConfig: {
          type: "text",
          placeholder: "Example: 115/72",
          label: "What is your blood pressure value?",
        },
      },
      { label: "No, I will get a new blood pressure measurement", next: "q15" },
    ],
  },
  {
    id: "blood-pressure",
    type: "text",
    text: "What is your blood pressure value?",
    inputConfig: {
      type: "text",
      placeholder: "Example: 115/72",
    },
    next: "q15",
  },
  {
    id: "q15",
    type: "medication-list",
    text: "Please list any current medicines, vitamins or dietary supplements you take regularly. Select Next if you don't take any.",
    next: "q16",
  },
  {
    id: "q16",
    type: "radio",
    text: "Do you take any of the following medicines?",
    options: [
      { label: "Nitroglycerin spray, ointment, patches or tablets", next: "q17" },
      { label: "Isosorbide mononitrate, isosorbide dinitrate(Isordil, Dilatrate, Sorbitrate, Imdur, Ismo, Monoket)", next: "q17" },
      { label: "Other medicines containing nitrates", next: "q17" },
      { label: "Alpha blocker medications (e.g., doxazosin (Cardura), prazosin, terazosin (Hytrin))", next: "q17" },
      { label: "Riociguat (Adempas)", next: "q17" },
      { label: "None apply", next: "q17" },
    ],
  },
  {
    id: "q17",
    type: "radio",
    text: "Do you have any allergies ?",
    options: [
      { label: "No", next: "q18" },
      {
        label: "Yes",
        next: "allergies",
        requiresTextInput: true,
        textInputConfig: {
          type: "text",
          label: "Please list what you are allergic to and the reaction that each allergy causes.",
          placeholder: "Leave a Description"
        },
      },      
    ],
  },
  {
    id: "allergies",
    type: "text",
    text: "Please list your medical condition(s), any prior surgeries, or other message to your doctor.",
    inputConfig: {
      type: "text",
      placeholder: "Leave a Description",
    },
    next: "q18",
  },
  {
    id: "q18",
    type: "radio",
    text: "Do you have any medical condition(s), a history of prior surgeries, or anything else you want to tell your doctor.",
    options: [
      { label: "No", next: "q19" },
      {
        label: "Yes",
        next: "conditions",
        requiresTextInput: true,
        textInputConfig: {
          type: "text",
          label: "Please list your medical condition(s), any prior surgeries, or other message to your doctor.",
          placeholder: ""
        },
      },
      
    ],
  },
  {
    id: "conditions",
    type: "text",
    text: "Please list your medical condition(s), any prior surgeries, or other message to your doctor.",
    inputConfig: {
      type: "text",
      placeholder: "Leave a Description",
    },
    next: "q19",
  },
  {
    id: "q19",
    type: "radio",
    text: "Do any of the following cardiovascular risk factors apply to you?",
    options: [
      {
        label: "Diabetes",
        next: "q20",
        requiresTextInput: true,
        textInputConfig: {
          type: "textarea",
          label: "Please describe your diabetes condition",
          placeholder: "Leave a Description",
        },
      },
      {
        label: "High cholesterol",
        next: "q20",
        requiresTextInput: true,
        textInputConfig: {
          type: "textarea",
          label: "Please describe your high cholesterol condition",
          placeholder: "Leave a Description",
        },
      },
      {
        label: "High blood pressure",
        next: "q20",
        requiresTextInput: true,
        textInputConfig: {
          type: "textarea",
          label: "Please describe your high blood pressure condition",
          placeholder: "Leave a Description",
        },
      },
      {
        label: "My father had a heart attack or heart disease at 55 years or younger",
        next: "q20",
        requiresTextInput: true,
        textInputConfig: {
          type: "textarea",
          label: "Please provide details about your father's heart condition",
          placeholder: "Leave a Description",
        },
      },
      {
        label: "My mother had a heart attack or heart disease at 65 year or younger",
        next: "q20",
        requiresTextInput: true,
        textInputConfig: {
          type: "textarea",
          label: "Please provide details about your mother's heart condition",
          placeholder: "Leave a Description",
        },
      },
      { label: "None apply to me", next: "q20" },
    ],
  },
  {
    id: "q20",
    type: "radio",
    text: "Do you have or have you previously been diagnosed with any of the following?",
    options: [
      {
        label: "Prostate cancer",
        next: "q21",
        requiresTextInput: true,
        textInputConfig: {
          type: "textarea",
          label: "Please describe your prostate cancer condition",
          placeholder: "Leave a Description",
        },
      },
      {
        label: "Enlarged prostate (BPH)",
        next: "q21",
        requiresTextInput: true,
        textInputConfig: {
          type: "textarea",
          label: "Please describe your enlarged prostate (BPH) condition",
          placeholder: "Leave a Description",
        },
      },
      {
        label: "Kidney transplant or any condition affecting the kidney",
        next: "q21",
        requiresTextInput: true,
        textInputConfig: {
          type: "textarea",
          label: "Please describe your kidney condition",
          placeholder: "Leave a Description",
        },
      },
      {
        label: "Liver disease",
        next: "q21",
        requiresTextInput: true,
        textInputConfig: {
          type: "textarea",
          label: "Please describe your liver disease condition",
          placeholder: "Leave a Description",
        },
      },
      {
        label: "Multiple Sclerosis (MS) or similar disease",
        next: "q21",
        requiresTextInput: true,
        textInputConfig: {
          type: "textarea",
          label: "Please describe your Multiple Sclerosis (MS) or similar disease condition",
          placeholder: "Leave a Description",
        },
      },
      {
        label: "Spinal injuries and/or paralysis",
        next: "q21",
        requiresTextInput: true,
        textInputConfig: {
          type: "textarea",
          label: "Please describe your spinal injuries and/or paralysis condition",
          placeholder: "Leave a Description",
        },
      },
      {
        label: "Neurological diseases",
        next: "q21",
        requiresTextInput: true,
        textInputConfig: {
          type: "textarea",
          label: "Please describe your neurological disease condition",
          placeholder: "Leave a Description",
        },
      },
      {
        label: "Stomach, intestinal, or bowel ulcers",
        next: "q21",
        requiresTextInput: true,
        textInputConfig: {
          type: "textarea",
          label: "Please describe your stomach, intestinal, or bowel ulcers condition",
          placeholder: "Leave a Description",
        },
      },
      {
        label: "Heart arrhythmias (abnormal beating of the heart)",
        next: "q21",
        requiresTextInput: true,
        textInputConfig: {
          type: "textarea",
          label: "Please describe your heart arrhythmias condition",
          placeholder: "Leave a Description",
        },
      },
      {
        label: "Any acquired, congenital, or developmental abnormalities of the heart including heart murmurs",
        next: "q21",
        requiresTextInput: true,
        textInputConfig: {
          type: "textarea",
          label: "Please describe your heart abnormalities condition",
          placeholder: "Leave a Description",
        },
      },
      { label: "None of these apply to me", next: "q21" },
    ],
  },
   {
     id: "q21",
     type: "radio",
     text: "Do you experience any of the following cardiovascular symptoms?",
     options: [
       { label: "Chest pain or shortness of breath when climbing 2 flights of stairs or walking 4 blocks", next: "q22" },
       { label: "Chest pain or shortness of breath with sexual activity", next: "q22" },
       { label: "Unexplained fainting or dizziness", next: "q22" }, 
       { label: "Prolonged cramping of the legs with exercise", next: "q22" },
       { label: "Abnormal heart beats or rhytms", next: "q22" },  
       { label: "None of these apply to me", next: "q22" }, 
     ],
   },
   {
     id: "q22",
     type: "radio",
     text: "Do you use any of the following recreational drugs?",
     options: [
       {
         label: "Poppers or Rush",
         next: "q23",
         requiresTextInput: true,
         textInputConfig: {
           type: "textarea",
           label: "Please explain your use of Poppers or Rush",
           placeholder: "Leave a Description",
         },
       },
       {
         label: "Amyl Nitrate or Butyl Nitrate",
         next: "q23",
         requiresTextInput: true,
         textInputConfig: {
           type: "textarea",
           label: "Please explain your use of Amyl Nitrate or Butyl Nitrate",
           placeholder: "Leave a Description",
         },
       },
       {
         label: "Cocaine",
         next: "q23",
         requiresTextInput: true,
         textInputConfig: {
           type: "textarea",
           label: "Please explain your use of Cocaine",
           placeholder: "Leave a Description",
         },
       },
       {
         label: "Cigarettes",
         next: "q23",
         requiresTextInput: true,
         textInputConfig: {
           type: "textarea",
           label: "Please explain your use of Cigarettes",
           placeholder: "Leave a Description",
         },
       },
       {
         label: "Other",
         next: "q23",
         requiresTextInput: true,
         textInputConfig: {
           type: "textarea",
           label: "Please explain your use of other recreational drugs",
           placeholder: "Leave a Description",
         },
       },
       { label: "No I don't use any of these", next: "q23" },
     ],
   },
    {
     id: "q23",
     type: "radio",
     text: "Do you have any of the following conditions?",
     options: [
       { label: "A marked curve or bend in the penis that interferes with sex, or Peyronie's disease", next: "q24" },
       { label: "Pain with erections or ejaculations", next: "q24" },
       { label: "A foreskin that it too tight", next: "q24" }, 
       { label: "None of these apply to me", next: "q24" },
     ],
   },
   {
     id: "q24",
     type: "radio",
     text: "Do you have now, or have you ever had any of the following conditions?",
     options: [
       {
         label: "Priapism (erection lasting longer than 4 hours)",
         next: "q25",
         requiresTextInput: true,
         textInputConfig: {
           type: "textarea",
           label: "Please tell us more about your Priapism (erection lasting longer than 4 hours)",
           placeholder: "Leave a Description",
         },
       },
       {
         label: "Retinitis Pigmentosa",
         next: "q25",
         requiresTextInput: true,
         textInputConfig: {
           type: "textarea",
           label: "Please tell us more about your Retinitis Pigmentosa",
           placeholder: "Leave a Description",
         },
       },
       {
         label: "Neurologic disease or stroke",
         next: "q25",
         requiresTextInput: true,
         textInputConfig: {
           type: "textarea",
           label: "Please tell us more about your Neurologic disease or stroke",
           placeholder: "Leave a Description",
         },
       },
       {
         label: "Blood clotting disorder, abnormal bleeding or bruising",
         next: "q25",
         requiresTextInput: true,
         textInputConfig: {
           type: "textarea",
           label: "Please tell us more about your Blood clotting disorder, abnormal bleeding or bruising",
           placeholder: "Leave a Description",
         },
       },
       {
         label: "Stomach or intestinal ulcer",
         next: "q25",
         requiresTextInput: true,
         textInputConfig: {
           type: "textarea",
           label: "Please tell us more about your Stomach or intestinal ulcer",
           placeholder: "Leave a Description",
         },
       },
       {
         label: "A prior heart attack or heart failure",
         next: "q25",
         requiresTextInput: true,
         textInputConfig: {
           type: "textarea",
           label: "Please tell us more about your prior heart attack or heart failure",
           placeholder: "Leave a Description",
         },
       },
       {
         label: "Peripheral artery disease",
         next: "q25",
         requiresTextInput: true,
         textInputConfig: {
           type: "textarea",
           label: "Please tell us more about your Peripheral artery disease",
           placeholder: "Leave a Description",
         },
       },
       {
         label: "Any history of QT prolongation",
         next: "q25",
         requiresTextInput: true,
         textInputConfig: {
           type: "textarea",
           label: "Please tell us more about your history of QT prolongation",
           placeholder: "Leave a Description",
         },
       },
       {
         label: "Sickle cell anemia, Myelomia, Leukemia",
         next: "q25",
         requiresTextInput: true,
         textInputConfig: {
           type: "textarea",
           label: "Please tell us more about your Sickle cell anemia, Myelomia, or Leukemia",
           placeholder: "Leave a Description",
         },
       },
       {
         label: "Idiopathic Hypertrophic Subaortic Stenosis",
         next: "q25",
         requiresTextInput: true,
         textInputConfig: {
           type: "textarea",
           label: "Please tell us more about your Idiopathic Hypertrophic Subaortic Stenosis",
           placeholder: "Leave a Description",
         },
       },
       {
         label: "Use of blood thinners",
         next: "q25",
         requiresTextInput: true,
         textInputConfig: {
           type: "textarea",
           label: "Please tell us more about your use of blood thinners",
           placeholder: "Leave a Description",
         },
       },
       { label: "None apply", next: "q25" },
     ],
   },
   {
    id: "q25",
    type: "radio",
    text: "Is there anything else you want your doctor to know about your condition or health ?",
    options: [
      {
        label: "Yes",
        next: "details",
        requiresTextInput: true,
        textInputConfig: {
          type: "text",
          label: "Please provide more details about the condition or health you want to share with doctor.",
          placeholder: "Leave a Description"
        },
      },      
      { label: "No", next: "q26" },
    ],
  },
   {
     id: "details",
     type: "text",
     text: "Please list your medical condition(s), any prior surgeries, or other message to your doctor.",
     inputConfig: {
       type: "text",
       placeholder: "Leave a Description",
     },
     next: "q26",
   },
   {
     id: "q26",
     type: "product-selection",
     text: "Which ED treatment do you prefer?",
     next: "dosage-selection",
   },
   {
     id: "dosage-selection",
     type: "dosage-selection",
     text: "Choose your dose strength",
     next: "shipping-address",
   },
   {
     id: "shipping-address",
     type: "shipping-address",
     text: "Please enter your shipping address",
     next: "checkout",
   },
   {
     id: "checkout",
     type: "checkout",
     text: "Almost Done!",
     next: "q27",
   },
 ];

export function findQuestionById(id: string): Question | undefined {
  return questions.find((q) => q.id === id);
}

export function getFirstQuestion(): Question {
  return questions[0];
}

