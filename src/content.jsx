export const categoryContent = {
  "/customer-service": {
    kind: "voice",
    eyebrow: "01 / Customer-service data",
    title: (
      <>
        Real conversations.
        <br />
        <span>All the context.</span>
      </>
    ),
    intro:
      "Speech data for models that need to follow a conversation, respond naturally, and understand what happened next.",
    lead: "A transcript is only part of the conversation.",
    explanation:
      "Pauses, interruptions, speaker changes, and the result of an interaction can matter as much as the words. We work from your model’s learning need to define which signals a dataset should retain.",
    sectionTitle: "Define the signals\nyour model needs.",
    groups: [
      [
        "Conversation audio",
        "Natural customer-service interactions, with language, acoustic conditions, and speaker separation assessed against the task.",
        "Speech recognition · Turn-taking",
      ],
      [
        "Transcripts and context",
        "Time-aligned text, speaker labels, intent, and relevant interaction metadata, where available and permitted.",
        "Conversation understanding",
      ],
      [
        "Linked outcomes",
        "Resolution, escalation, and other recorded outcomes that can make an interaction useful for training or evaluation.",
        "Task completion · Evaluation",
      ],
    ],
    briefTitle: "A useful brief goes beyond hours of audio.",
    brief: [
      [
        "The task",
        "Speech recognition, conversational behaviour, or an evaluation gap.",
      ],
      [
        "The conversations",
        "Language, domain, channel, speaker mix, and acoustic conditions.",
      ],
      [
        "The retained context",
        "Timestamps, turns, labels, outcomes, and the quality criteria that matter.",
      ],
      [
        "The permitted use",
        "Training or evaluation scope, access needs, and intended recipients.",
      ],
    ],
    note: "Language coverage, volume, linked fields, and licensing scope are established through source review. Contact-centre possession alone does not establish authority to license a recording.",
    faq: [
      [
        "Is this an off-the-shelf catalogue?",
        "We start with a defined requirement and assess relevant sources. The fields shown here describe what a useful dataset may contain, rather than a promise of inventory or a fixed volume.",
      ],
      [
        "Can audio be linked to customer-service outcomes?",
        "Where source systems retain the linkage and the proposed use is permitted, outcomes can form part of the scope. We first establish what was recorded and what can be retained after preparation.",
      ],
      [
        "How do you approach rights and sensitive information?",
        "The source, relevant contractual obligations, participant permissions, and proposed use need review. Preparation and access controls are defined for the agreed scope before delivery.",
      ],
    ],
  },
  "/healthcare": {
    kind: "clinical",
    eyebrow: "02 / Healthcare data",
    title: (
      <>
        Clinical depth.
        <br />
        <span>Beyond the record.</span>
      </>
    ),
    intro:
      "Specialist clinical data for AI teams that need linked context, expert judgement, and evaluation beyond a public benchmark.",
    lead: "The image is one part of the clinical question.",
    explanation:
      "A record becomes more useful when the relevant reports, annotations, timepoints, and outcomes can be understood together. We scope healthcare data around a specific research task and the permissions it requires.",
    sectionTitle: "Start with a clinical\nquestion worth answering.",
    groups: [
      [
        "Imaging and interpretation",
        "Define the images, reports, annotations, and acquisition context needed to train or evaluate a model.",
        "Images · Reports · Annotations",
      ],
      [
        "Longitudinal context",
        "Identify which linked records and timepoints are needed to study progression, decisions, or outcomes.",
        "Linked records · Follow-up",
      ],
      [
        "Specialist evaluation",
        "Explore expert-reviewed data for a narrowly defined model behaviour or clinical workflow.",
        "Review protocols · Expert edits",
      ],
    ],
    briefTitle: "A focused direction: radiotherapy evaluation.",
    brief: [
      [
        "Define the task",
        "A specific anatomy, contouring task, and intended evaluation setting.",
      ],
      [
        "Establish the reference",
        "A clinical lead, a review protocol, and an agreed interpretation of acceptable contours.",
      ],
      [
        "Assess the records",
        "Images, initial contours, expert corrections, and linked context where they exist.",
      ],
      [
        "Agree the study scope",
        "Institutional permissions, evaluation criteria, and the conditions for access.",
      ],
    ],
    note: "Radiotherapy contour correction is an area under exploration. Dataset availability, institutional access, and a review protocol must be established for each project.",
    faq: [
      [
        "Do you have a ready-to-license healthcare catalogue?",
        "These are areas of focus. Availability depends on the specific source, records, rights, approvals, and intended use. A discussion starts with the research requirement and an assessment of feasibility.",
      ],
      [
        "What makes a specialist evaluation dataset useful?",
        "A clearly defined task, appropriate case selection, an agreed expert review process, and the context needed to interpret a result. The protocol should be developed with qualified clinical specialists.",
      ],
      [
        "Can you provide correction histories and outcomes?",
        "Only where they were recorded, can be linked appropriately, and are authorised for the proposed use. Historical correction reasoning or timing may be absent; prospective collection would require a separately agreed scope.",
      ],
    ],
  },
};

export function getPageMeta(path) {
  const normalized = path.replace(/\/$/, "") || "/";
  const data = categoryContent[normalized];
  return {
    title: data
      ? `${data.kind === "voice" ? "Customer-service data" : "Healthcare data"} | Neptune Data`
      : "Neptune Data | Real-world data for AI",
    description: data
      ? data.intro
      : "Proprietary customer-service and healthcare data for AI training and evaluation. Sourcing, preparation, rights review and licensing.",
  };
}
