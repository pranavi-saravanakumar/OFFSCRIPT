const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

if (!fs.existsSync('public/uploads')) {
    fs.mkdirSync('public/uploads', { recursive: true });
}

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage: storage });

const DATA_FILE = path.join(__dirname, 'challenges.json');

const defaultChallenges = [
    {
        id: "1",
        title: "Acute Groundwater Depletion in Rural Ranchi",
        description: "Borewells are drying up rapidly during summer months affecting drinking water access for 5 villages.",
        domain: "Water Resources",
        location: "Ranchi, Jharkhand",
        district: "Ranchi",
        populationAffected: "15,000 citizens",
        reportCount: 5,
        priorityScore: 95,
        priorityLevel: "Very Critical",
        status: "Pilot Implementation Active",
        pipelineStage: "Pilot",
        communityRep: "Marisol Ortega (Ranchi Residents Assn)",
        university: "Birla Institute of Technology (BIT) Mesra - Civil & Environmental Dept",
        facultyMentor: "Dr. R. K. Sharma",
        studentTeam: "Team AquaTech (Civil + CSE)",
        solutionProposal: "IoT-enabled smart solar borewell monitoring and automated recharge pit management system.",
        industry: "Tata Steel CSR [CSR Organization]",
        pledgedValue: "₹5,00,000",
        milestones: "Milestone 3 of 3: Field Pilot & Deployment",
        deliverables: "IoT Firmware v2.1, Solar Sensor Unit",
        testingOutcome: "Passed high-stress field pressure test with 91% water preservation efficiency.",
        ipGeneration: "Patent Filed (IPA-2026-9921)",
        startupIncubation: "HydroIoT Solutions (Incubated at BIT Mesra)",
        completionRate: 85,
        timeline: [
            { stage: "Definition", time: "Jun 10, 09:30 AM", status: "Completed" },
            { stage: "Validation", time: "Jun 12, 02:15 PM", status: "Completed" },
            { stage: "Pilot", time: "Jun 15, 11:00 AM", status: "Active" },
            { stage: "Deployed", time: "Pending", status: "Upcoming" }
        ],
        imagePath: null,
        emailNotificationStatus: "📧 Briefing Dispatched to stakeholder@tata.com",
        date: "2026-06-10"
    },
    {
        id: "2",
        title: "Digital Literacy & STEM Learning Gaps in Tribal Schools",
        description: "Government residential schools lack functioning computer labs and interactive regional language software.",
        domain: "Education",
        location: "Khunti, Jharkhand",
        district: "Khunti",
        populationAffected: "3,200 students",
        reportCount: 3,
        priorityScore: 76,
        priorityLevel: "High",
        status: "Idea & Lab Validation Phase",
        pipelineStage: "Validation",
        communityRep: "Sunil Munda (Khunti Tribal Welfare)",
        university: "Central University of Jharkhand - Department of Education",
        facultyMentor: "Dr. Ananya Sen",
        studentTeam: "Team EdPulse (IT + AI)",
        solutionProposal: "Offline-first regional language AI tutor tablet interface with offline quiz modules.",
        industry: "HCL Foundation [CSR Organization]",
        pledgedValue: "₹3,50,000",
        milestones: "Milestone 2 of 3: Prototype Lab Testing",
        deliverables: "Offline APK v1.0, Curricular Mapping",
        testingOutcome: "Tested successfully with 45 students in controlled lab environment.",
        ipGeneration: "Copyright Registered (CR-2026-441)",
        startupIncubation: "EdPulse Learning Labs",
        completionRate: 50,
        timeline: [
            { stage: "Definition", time: "Jun 11, 10:00 AM", status: "Completed" },
            { stage: "Validation", time: "Jun 14, 01:30 PM", status: "Active" },
            { stage: "Pilot", time: "Pending", status: "Upcoming" },
            { stage: "Deployed", time: "Pending", status: "Upcoming" }
        ],
        imagePath: null,
        emailNotificationStatus: null,
        date: "2026-06-11"
    },
    {
        id: "3",
        title: "Post-Harvest Crop Spoilage Due to Cold Storage Deficits",
        description: "Smallholder tomato and vegetable farmers face 30% waste due to lack of decentralized cold storage facilities.",
        domain: "Agriculture",
        location: "Hazaribagh, Jharkhand",
        district: "Hazaribagh",
        populationAffected: "1,200 farming households",
        reportCount: 4,
        priorityScore: 72,
        priorityLevel: "High",
        status: "Definition & Scoping Active",
        pipelineStage: "Definition",
        communityRep: "Rameshwar Mahto (FPO President)",
        university: "Birsa Agricultural University, Kanke - Research Cell",
        facultyMentor: "Dr. V. K. Singh",
        studentTeam: "Team AgroCool (Mechanical)",
        solutionProposal: "Solar-powered phase change material (PCM) low-cost modular cold storage unit.",
        industry: "ITC Limited Agri Division [Corporate Sponsor]",
        pledgedValue: "₹4,00,000",
        milestones: "Milestone 1 of 3: Problem Scoping & Analysis",
        deliverables: "Thermal Thermodynamic Blueprint",
        testingOutcome: "Pending Lab Simulation",
        ipGeneration: "None Yet",
        startupIncubation: "None Yet",
        completionRate: 20,
        timeline: [
            { stage: "Definition", time: "Jun 13, 11:15 AM", status: "Active" },
            { stage: "Validation", time: "Pending", status: "Upcoming" },
            { stage: "Pilot", time: "Pending", status: "Upcoming" },
            { stage: "Deployed", time: "Pending", status: "Upcoming" }
        ],
        imagePath: null,
        emailNotificationStatus: null,
        date: "2026-06-13"
    },
    {
        id: "4",
        title: "Real-time Maternal Healthcare Triage & Transport Delay",
        description: "Pregnant women in remote hilly terrains suffer critical delays in emergency ambulance routing.",
        domain: "Healthcare",
        location: "Gumla, Jharkhand",
        district: "Gumla",
        populationAffected: "8,500 rural families",
        reportCount: 6,
        priorityScore: 88,
        priorityLevel: "Critical",
        status: "Deployment & Scaling Active",
        pipelineStage: "Deployed",
        communityRep: "Anita Minj (District ASHA Coordinator)",
        university: "Rajendra Institute of Medical Sciences (RIMS) - Tech Innovation Cell",
        facultyMentor: "Dr. Priya Roy",
        studentTeam: "Team LifeLine (ECE + CSE)",
        solutionProposal: "LoRa-based emergency SOS panic button integrated with district ambulance dispatch GIS maps.",
        industry: "Tata Power CSR [Corporate Partner]",
        pledgedValue: "₹7,50,000",
        milestones: "Milestone 3 of 3: Full District Deployment",
        deliverables: "Hardware Transmitters, Dispatch Dashboard",
        testingOutcome: "Reduced average emergency response time by 42 minutes across 12 CHCs.",
        ipGeneration: "Patent Granted (IPA-2025-1102)",
        startupIncubation: "LifeLine Emergency Systems",
        completionRate: 100,
        timeline: [
            { stage: "Definition", time: "May 20, 09:00 AM", status: "Completed" },
            { stage: "Validation", time: "May 28, 11:30 AM", status: "Completed" },
            { stage: "Pilot", time: "Jun 05, 10:00 AM", status: "Completed" },
            { stage: "Deployed", time: "Jun 12, 04:00 PM", status: "Completed" }
        ],
        imagePath: null,
        emailNotificationStatus: "📧 Briefing Dispatched to emergency@tatapower.com",
        date: "2026-05-20"
    }
];

let challenges = [];

function calculatePopulationPriority(populationText, reportCount = 1) {
    const text = (populationText || '').toLowerCase();
    const normalizedText = text.replace(/(\d),(\d)/g, '$1$2');
    const matches = normalizedText.match(/\d+/g);
    let count = 15; 
    
    if (matches && matches.length > 0) {
        count = parseInt(matches[matches.length - 1], 10);
    }

    let level = "Can be taken care later";
    let baseScore = 15;

    if (count > 10000) {
        level = "Very Critical";
        baseScore = 90;
    } else if (count > 5000) {
        level = "Critical";
        baseScore = 80;
    } else if (count > 1000) {
        level = "High";
        baseScore = 70;
    } else if (count > 500) {
        level = "Moderate";
        baseScore = 55;
    } else if (count > 100) {
        level = "Mild";
        baseScore = 40;
    } else if (count > 50) {
        level = "Low";
        baseScore = 25;
    } else {
        level = "Can be taken care later";
        baseScore = 10;
    }

    let intraTierSpan = 8;
    let intraTierBonus = 0;

    if (count > 10000) intraTierBonus = Math.min(Math.floor((count - 10001) / 5000), intraTierSpan);
    else if (count > 5000) intraTierBonus = Math.floor(((count - 5001) / 5000) * intraTierSpan);
    else if (count > 1000) intraTierBonus = Math.floor(((count - 1001) / 4000) * intraTierSpan);
    else if (count > 500) intraTierBonus = Math.floor(((count - 501) / 500) * intraTierSpan);
    else if (count > 100) intraTierBonus = Math.floor(((count - 101) / 400) * intraTierSpan);
    else if (count > 50) intraTierBonus = Math.floor(((count - 51) / 50) * intraTierSpan);
    else intraTierBonus = Math.min(count, 5);

    let reportBoost = Math.min((reportCount || 1) * 0.4, 2);
    let score = Math.min(baseScore + intraTierBonus + Math.round(reportBoost), 100);

    return { score, level, count };
}

function loadChallenges() {
    if (fs.existsSync(DATA_FILE)) {
        try {
            const data = fs.readFileSync(DATA_FILE, 'utf8');
            challenges = JSON.parse(data);
            if (!Array.isArray(challenges) || challenges.length < 4) {
                challenges = [...defaultChallenges];
            }
        } catch (err) {
            challenges = [...defaultChallenges];
        }
    } else {
        challenges = [...defaultChallenges];
    }

    challenges = challenges.map(c => {
        if (c && c.populationAffected) {
            const priorityData = calculatePopulationPriority(c.populationAffected, c.reportCount || 1);
            c.priorityScore = priorityData.score;
            c.priorityLevel = priorityData.level;
        }
        return c;
    });

    saveChallenges();
}

function saveChallenges() {
    fs.writeFileSync(DATA_FILE, JSON.stringify(challenges, null, 2));
}

loadChallenges();

let notifications = [
    { id: "n1", type: "IP_FILED", text: "💡 Patent Granted for LifeLine Emergency Systems in Gumla district.", time: "10:30 AM" },
    { id: "n2", type: "STARTUP_INC", text: "🚀 New Startup 'EdPulse Learning Labs' registered via Central University.", time: "11:15 AM" }
];

function aiCategorize(text) {
    const lower = (text || '').toLowerCase();
    if (lower.includes('water') || lower.includes('river') || lower.includes('borewell') || lower.includes('drought')) return 'Water Resources';
    if (lower.includes('school') || lower.includes('student') || lower.includes('education') || lower.includes('teach')) return 'Education';
    if (lower.includes('crop') || lower.includes('farmer') || lower.includes('agriculture') || lower.includes('soil')) return 'Agriculture';
    if (lower.includes('hospital') || lower.includes('health') || lower.includes('doctor') || lower.includes('disease') || lower.includes('maternal')) return 'Healthcare';
    return 'Urban Development & Public Services';
}

function autoRouteUniversity(domain) {
    switch (domain) {
        case 'Water Resources': return 'Birla Institute of Technology (BIT) Mesra - Civil & Environmental Dept';
        case 'Education': return 'Central University of Jharkhand - Department of Education';
        case 'Agriculture': return 'Birsa Agricultural University, Kanke - Research Cell';
        case 'Healthcare': return 'Rajendra Institute of Medical Sciences (RIMS) - Tech Innovation Cell';
        default: return 'Indian Institute of Technology (IIT) (ISM) Dhanbad - Applied Sciences';
    }
}

app.get('/', (req, res) => {
    const sortedChallenges = Array.isArray(challenges) ? [...challenges].sort((a, b) => b.priorityScore - a.priorityScore) : [];
    res.render('index', { challenges: sortedChallenges });
});

app.get('/submit', (req, res) => res.render('submit', { error: null }));

app.post('/submit', upload.single('evidenceImage'), (req, res) => {
    try {
        const body = req.body || {};
        const title = (body.title || 'Untitled Report').trim();
        const description = (body.description || '').trim();
        const location = (body.location || 'Ranchi, Jharkhand').trim();
        const citizenId = (body.citizenId || 'ANONYMOUS').trim();

        let populationAffected = body.populationAffected;
        if (!populationAffected || populationAffected.trim() === '') {
            const combinedText = (title + " " + description);
            const normalizedCombined = combinedText.replace(/(\d),(\d)/g, '$1$2');
            const numbers = normalizedCombined.match(/\d+/);
            if (numbers) {
                populationAffected = `${numbers[0]} people affected`;
            } else {
                populationAffected = "15 people affected";
            }
        }

        if (!Array.isArray(challenges)) challenges = [];

        const existingIndex = challenges.findIndex(c => c && c.title && c.title.toLowerCase() === title.toLowerCase());
        
        if (existingIndex !== -1) {
            challenges[existingIndex].reportCount = (challenges[existingIndex].reportCount || 1) + 1;
            challenges[existingIndex].populationAffected = populationAffected;
            
            let updatedPriority = calculatePopulationPriority(populationAffected, challenges[existingIndex].reportCount);
            challenges[existingIndex].priorityScore = updatedPriority.score;
            challenges[existingIndex].priorityLevel = updatedPriority.level;

            saveChallenges();
            
            notifications.unshift({
                id: uuidv4(),
                type: "REPORT_INCREMENT",
                text: `📈 Community report count increased for '${title}' (Total Reports: ${challenges[existingIndex].reportCount}).`,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            });

            return res.redirect('/dashboard');
        }

        let domain = aiCategorize(title + " " + description);
        let assignedHEI = autoRouteUniversity(domain);
        let districtName = location.split(',')[0] ? location.split(',')[0].trim() : 'Ranchi';
        let currentTime = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ", " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        let priorityData = calculatePopulationPriority(populationAffected, 1);

        const newChallenge = {
            id: uuidv4(),
            title,
            description,
            domain,
            location,
            district: districtName,
            populationAffected,
            reportCount: 1,
            priorityScore: priorityData.score,
            priorityLevel: priorityData.level,
            status: "Under Academic Routing & Evaluation",
            pipelineStage: "Definition",
            communityRep: `Citizen ID: ${citizenId} (${districtName} Residents)`,
            university: assignedHEI,
            facultyMentor: "Dr. Assigned Faculty Mentor (Pending Spec)",
            studentTeam: "Team Innovate (" + domain.split(' ')[0] + " Dept)",
            solutionProposal: "AI-generated prototype structure pending student/faculty review.",
            industry: "Open for Partnership & CSR Funding",
            pledgedValue: "₹0",
            milestones: "Milestone 1: Problem Scoping & Analysis",
            deliverables: "Initial SRS & Feasibility Report",
            testingOutcome: "Pending Simulation & Lab Tests",
            ipGeneration: "None Yet",
            startupIncubation: "None Yet",
            completionRate: 25,
            timeline: [
                { stage: "Definition", time: currentTime, status: "Active" },
                { stage: "Validation", time: "Pending", status: "Upcoming" },
                { stage: "Pilot", time: "Pending", status: "Upcoming" },
                { stage: "Deployed", time: "Pending", status: "Upcoming" }
            ],
            imagePath: req.file ? `/uploads/${req.file.filename}` : null,
            emailNotificationStatus: null,
            date: new Date().toISOString().split('T')[0]
        };

        challenges.unshift(newChallenge);
        saveChallenges();

        notifications.unshift({
            id: uuidv4(),
            type: "NEW_COMPLAINT",
            text: `🤖 AI routed validated problem '${title}' affecting ${populationAffected} to ${assignedHEI}.`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });

        res.redirect('/dashboard');
    } catch (err) {
        console.error("Submission Error:", err);
        res.render('submit', { error: "An unexpected error occurred while processing your report. Please check your inputs and try again." });
    }
});

app.get('/dashboard', (req, res) => {
    try {
        if (!Array.isArray(challenges)) challenges = [];
        const sortedChallenges = [...challenges].sort((a, b) => b.priorityScore - a.priorityScore);
        
        const stats = {
            totalReports: challenges.reduce((acc, c) => acc + (c.reportCount || 1), 0),
            totalChallenges: challenges.length,
            completedRate: challenges.length ? Math.round(challenges.reduce((acc, c) => acc + (c.completionRate || 0), 0) / challenges.length) : 0,
            patentsCount: challenges.filter(c => c.ipGeneration && c.ipGeneration.includes('Patent')).length,
            startupsCount: challenges.filter(c => c.startupIncubation && !c.startupIncubation.includes('None')).length,
            waterCount: challenges.filter(c => c.domain === 'Water Resources').length,
            eduCount: challenges.filter(c => c.domain === 'Education').length,
            agriCount: challenges.filter(c => c.domain === 'Agriculture').length,
            healthCount: challenges.filter(c => c.domain === 'Healthcare').length,
            urbanCount: challenges.filter(c => c.domain === 'Urban Development & Public Services').length,
            definitionCount: challenges.filter(c => !c.pipelineStage || c.pipelineStage === 'Definition').length,
            validationCount: challenges.filter(c => c.pipelineStage === 'Validation').length,
            pilotCount: challenges.filter(c => c.pipelineStage === 'Pilot').length,
            deployedCount: challenges.filter(c => c.pipelineStage === 'Deployed').length,
            activePilots: challenges.filter(c => c.pipelineStage === 'Pilot').length
        };

        res.render('dashboard', { challenges: sortedChallenges, stats, notifications });
    } catch (err) {
        console.error("Dashboard Error:", err);
        res.status(500).send("Dashboard Error: " + err.message);
    }
});

app.get('/lifecycle', (req, res) => {
    const sortedChallenges = Array.isArray(challenges) ? [...challenges].sort((a, b) => b.priorityScore - a.priorityScore) : [];
    res.render('lifecycle', { challenges: sortedChallenges });
});

// --- ERROR-FREE SYNCHRONIZED LIFECYCLE UPDATE ROUTE ---
app.post('/update-lifecycle/:id', (req, res) => {
    try {
        const { id } = req.params;
        const { milestones, deliverables, testingOutcome, ipGeneration, startupIncubation, completionRate, status } = req.body;
        
        const challenge = challenges.find(c => c.id === id);
        if (challenge) {
            if (milestones) challenge.milestones = milestones;
            if (deliverables) challenge.deliverables = deliverables;
            if (testingOutcome) challenge.testingOutcome = testingOutcome;
            if (ipGeneration) challenge.ipGeneration = ipGeneration;
            if (startupIncubation) challenge.startupIncubation = startupIncubation;
            
            if (completionRate !== undefined && completionRate !== '') {
                challenge.completionRate = parseInt(completionRate, 10) || challenge.completionRate;
            }
            if (status) challenge.status = status;

            // Automatically align pipeline stage based on completion progress percentage
            if (challenge.completionRate >= 100) {
                challenge.pipelineStage = "Deployed";
            } else if (challenge.completionRate >= 60) {
                challenge.pipelineStage = "Pilot";
            } else if (challenge.completionRate >= 30) {
                challenge.pipelineStage = "Validation";
            } else {
                challenge.pipelineStage = "Definition";
            }

            // Automatically synchronize timeline boxes and stages for dashboard / home view
            const stages = ["Definition", "Validation", "Pilot", "Deployed"];
            const currentStageIndex = stages.indexOf(challenge.pipelineStage);
            const currentTime = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ", " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            if (!Array.isArray(challenge.timeline)) {
                challenge.timeline = stages.map(s => ({ stage: s, time: "Pending", status: "Upcoming" }));
            }

            challenge.timeline = stages.map((st, idx) => {
                let existing = challenge.timeline.find(t => t.stage === st) || { stage: st };
                if (idx < currentStageIndex) {
                    return { 
                        stage: st, 
                        time: existing.time && existing.time !== "Pending" ? existing.time : currentTime, 
                        status: "Completed" 
                    };
                } else if (idx === currentStageIndex) {
                    return { 
                        stage: st, 
                        time: currentTime, 
                        status: "Active" 
                    };
                } else {
                    return { 
                        stage: st, 
                        time: "Pending", 
                        status: "Upcoming" 
                    };
                }
            });

            saveChallenges();

            notifications.unshift({
                id: uuidv4(),
                type: "LIFECYCLE_UPDATE",
                text: `📈 Lifecycle updated for '${challenge.title}': Now at ${challenge.completionRate}% completion (${challenge.status}).`,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            });
        }
        res.redirect('/lifecycle');
    } catch (err) {
        console.error("Lifecycle Update Error:", err);
        res.status(500).send("Error updating lifecycle: " + err.message);
    }
});

app.post('/update-university-team/:id', (req, res) => {
    const { id } = req.params;
    const { facultyMentor, studentTeam, solutionProposal } = req.body;
    const challenge = challenges.find(c => c.id === id);
    if (challenge) {
        if (facultyMentor) challenge.facultyMentor = facultyMentor;
        if (studentTeam) challenge.studentTeam = studentTeam;
        if (solutionProposal) challenge.solutionProposal = solutionProposal;
        saveChallenges();
    }
    res.redirect('/university-portal');
});

app.post('/fund-challenge/:id', (req, res) => {
    const { id } = req.params;
    const { orgName, supportType, contribution } = req.body;
    const challenge = challenges.find(c => c.id === id);
    if (challenge) {
        const org = orgName || 'Industry Partner';
        const support = supportType || 'Co-development & CSR Funding';
        const grant = contribution ? `₹${contribution}` : '₹3,00,000';
        challenge.industry = `${org} ➔ ${support} (${grant})`;
        challenge.pledgedValue = grant;
        saveChallenges();
    }
    res.redirect('/industry-portal');
});

app.post('/send-partnership-dispatch/:id', (req, res) => {
    const { id } = req.params;
    const { recipientEmail } = req.body;
    const challenge = challenges.find(c => c.id === id);
    if (challenge) {
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const targetEmail = recipientEmail || 'stakeholders@offscript.org';
        challenge.emailNotificationStatus = `📧 Briefing Dispatched to ${targetEmail} at ${timestamp}`;
        saveChallenges();
    }
    res.redirect('/dashboard');
});

app.get('/university-portal', (req, res) => res.render('university', { challenges: Array.isArray(challenges) ? challenges : [] }));
app.get('/industry-portal', (req, res) => res.render('industry', { challenges: Array.isArray(challenges) ? challenges : [] }));
app.get('/admin', (req, res) => res.render('admin', { challenges: Array.isArray(challenges) ? challenges : [] }));

const server = app.listen(PORT, () => {
    console.log(`🚀 Off Script Engine running on http://localhost:${PORT}`);
});