// ServiceNow Platform & CSA Certification Roadmap
// 4 Phases structured with exact topics, beginner-friendly estimates, and resources.

export const SERVICENOW_ROADMAP_PHASES = [
  {
    id: 'sn-phase-1',
    phaseNumber: 1,
    title: 'Phase 1: ITSM Concepts',
    subtitle: 'ITIL Framework, Incident, Problem, Change & Service Catalog',
    unlockRequirement: null, // Always unlocked
    resource: 'Now Learning (free)',
    resourceUrl: 'https://nowlearning.servicenow.com',
    topics: [
      { id: 'sn-p1-t1', topicNumber: 1, name: 'What is ITSM & ITIL Framework', estTime: '1 hr', estHours: 1, completed: false, loggedHours: 0, notes: '', resourceUrl: 'https://nowlearning.servicenow.com' },
      { id: 'sn-p1-t2', topicNumber: 2, name: 'Incident Management Lifecycle', estTime: '2 hrs', estHours: 2, completed: false, loggedHours: 0, notes: '', resourceUrl: 'https://nowlearning.servicenow.com' },
      { id: 'sn-p1-t3', topicNumber: 3, name: 'Problem Management & Root Cause Analysis', estTime: '1 hr', estHours: 1, completed: false, loggedHours: 0, notes: '', resourceUrl: 'https://nowlearning.servicenow.com' },
      { id: 'sn-p1-t4', topicNumber: 4, name: 'Change Management & CAB Approvals', estTime: '2 hrs', estHours: 2, completed: false, loggedHours: 0, notes: '', resourceUrl: 'https://nowlearning.servicenow.com' },
      { id: 'sn-p1-t5', topicNumber: 5, name: 'Service Catalog & Request Fulfillment', estTime: '1 hr', estHours: 1, completed: false, loggedHours: 0, notes: '', resourceUrl: 'https://nowlearning.servicenow.com' },
    ]
  },
  {
    id: 'sn-phase-2',
    phaseNumber: 2,
    title: 'Phase 2: Platform Basics',
    subtitle: 'Navigation, Tables, Schema, Forms, Lists & User Administration',
    unlockRequirement: { phaseId: 'sn-phase-1', threshold: 70, description: 'Complete 70% of Phase 1 to unlock' },
    resource: 'ServiceNow Developer PDI',
    resourceUrl: 'https://developer.servicenow.com',
    topics: [
      { id: 'sn-p2-t1', topicNumber: 6, name: 'Navigating the Platform & Next Experience UI', estTime: '1 hr', estHours: 1, completed: false, loggedHours: 0, notes: '', resourceUrl: 'https://developer.servicenow.com' },
      { id: 'sn-p2-t2', topicNumber: 7, name: 'Tables and Records (Sys_id, Schema Map)', estTime: '2 hrs', estHours: 2, completed: false, loggedHours: 0, notes: '', resourceUrl: 'https://developer.servicenow.com' },
      { id: 'sn-p2-t3', topicNumber: 8, name: 'Forms, Lists, and Filter Conditions', estTime: '1 hr', estHours: 1, completed: false, loggedHours: 0, notes: '', resourceUrl: 'https://developer.servicenow.com' },
      { id: 'sn-p2-t4', topicNumber: 9, name: 'User Administration, Groups & Roles', estTime: '2 hrs', estHours: 2, completed: false, loggedHours: 0, notes: '', resourceUrl: 'https://developer.servicenow.com' },
    ]
  },
  {
    id: 'sn-phase-3',
    phaseNumber: 3,
    title: 'Phase 3: Scripting',
    subtitle: 'Client Scripts, Business Rules, Script Includes, UI Policies & Flow Designer',
    unlockRequirement: { phaseId: 'sn-phase-2', threshold: 70, description: 'Complete 70% of Phase 2 to unlock' },
    resource: 'Developer PDI + Now Learning',
    resourceUrl: 'https://developer.servicenow.com',
    topics: [
      { id: 'sn-p3-t1', topicNumber: 10, name: 'Client Scripts (onLoad, onChange, onSubmit, onCellEdit)', estTime: '3 hrs', estHours: 3, completed: false, loggedHours: 0, notes: '', resourceUrl: 'https://developer.servicenow.com' },
      { id: 'sn-p3-t2', topicNumber: 11, name: 'Business Rules (before, after, async, display)', estTime: '3 hrs', estHours: 3, completed: false, loggedHours: 0, notes: '', resourceUrl: 'https://developer.servicenow.com' },
      { id: 'sn-p3-t3', topicNumber: 12, name: 'Script Includes & GlideAjax Calls', estTime: '2 hrs', estHours: 2, completed: false, loggedHours: 0, notes: '', resourceUrl: 'https://developer.servicenow.com' },
      { id: 'sn-p3-t4', topicNumber: 13, name: 'UI Policies and UI Actions', estTime: '1 hr', estHours: 1, completed: false, loggedHours: 0, notes: '', resourceUrl: 'https://developer.servicenow.com' },
      { id: 'sn-p3-t5', topicNumber: 14, name: 'Flow Designer (No-Code Enterprise Automation)', estTime: '3 hrs', estHours: 3, completed: false, loggedHours: 0, notes: '', resourceUrl: 'https://developer.servicenow.com' },
    ]
  },
  {
    id: 'sn-phase-4',
    phaseNumber: 4,
    title: 'Phase 4: Integrations & CSA Prep',
    subtitle: 'REST APIs, Import Sets, Mock Exams & Flashcard Revision',
    unlockRequirement: { phaseId: 'sn-phase-3', threshold: 70, description: 'Complete 70% of Phase 3 to unlock' },
    resource: 'developer.servicenow.com + YouTube: ServiceNow Guru',
    resourceUrl: 'https://developer.servicenow.com',
    topics: [
      { id: 'sn-p4-t1', topicNumber: 15, name: 'REST API Basics in ServiceNow (REST API Explorer)', estTime: '3 hrs', estHours: 3, completed: false, loggedHours: 0, notes: '', resourceUrl: 'https://developer.servicenow.com' },
      { id: 'sn-p4-t2', topicNumber: 16, name: 'Scripted REST APIs Creation', estTime: '2 hrs', estHours: 2, completed: false, loggedHours: 0, notes: '', resourceUrl: 'https://developer.servicenow.com' },
      { id: 'sn-p4-t3', topicNumber: 17, name: 'Import Sets & Transform Maps', estTime: '2 hrs', estHours: 2, completed: false, loggedHours: 0, notes: '', resourceUrl: 'https://developer.servicenow.com' },
      { id: 'sn-p4-t4', topicNumber: 18, name: 'CSA Mock Tests Practice', estTime: '5 hrs', estHours: 5, completed: false, loggedHours: 0, notes: '', resourceUrl: 'https://developer.servicenow.com' },
      { id: 'sn-p4-t5', topicNumber: 19, name: 'Flashcard Revision & Core CSA Notes', estTime: '3 hrs', estHours: 3, completed: false, loggedHours: 0, notes: '', resourceUrl: 'https://developer.servicenow.com' },
    ]
  }
];
