import type { WhitepaperChapter } from './index';

const chapter: WhitepaperChapter = {
  id: "10",
  title: "Governance, Privacy & Compliance",
  part: "PART IV: OPERATIONS",
  html: `<h1>Whitepaper V7 - Chapter 10: Governance, Privacy &amp; Compliance</h1>
<h2>Why Governance Matters</h2>
<p>The Strands ecosystem is designed to decentralise over time. The game launches under conventional company stewardship. $KREDS launches under protocol-defined rules. Layer U SPVs operate under jurisdictionally localised corporate structures. As each layer matures, governance decisions ; protocol upgrades, emission parameters, Layer U policy frameworks, ecosystem fund allocation ; must progressively shift from founding-team stewardship to participant-driven process.</p>
<p>This chapter describes how that shift is structured, what privacy architecture underpins it, and how the system maintains regulatory compliance across jurisdictions without centralising control.</p>
<h2>Governance Model</h2>
<p>Strands governance is participation-weighted, not capital-weighted. Governance rights attach to validated participation in the network, not to passive token holdings or accumulated capital. This follows directly from the consensus model described in Chapter 7: verified personhood, validated application or node presence, active participation, and honest contribution determine standing ; not the size of a wallet.</p>
<h3>Network-Level Governance</h3>
<p>At the protocol level, governance decisions include: changes to emission and burn parameters, consensus rule updates, protocol upgrades, and ecosystem fund allocation. These decisions are proposed and ratified through on-chain governance mechanisms once the native Strands chain is active.</p>
<p>Voting weight is determined by validated participation context ; not by raw $KREDS balance. Governance weight is derived from attested participation signals ; including validated node presence, uptime, contribution history, and active network involvement ; rather than passive balance alone. A participant who holds tokens passively does not accumulate equivalent governance influence. This prevents the plutocratic capture that undermines most token-governance systems.</p>
<p>Governance activation follows the same phased logic as the rest of the ecosystem. During the fiat and Jetton phases, protocol decisions remain under founding-team stewardship while the network is still below the threshold required for participant-governed execution. As the native chain matures and the participant base grows, governance authority progressively transfers to the network. The timeline for that transfer is not predetermined ; it is gated by network readiness, not by calendar.</p>
<h3>Layer U Governance</h3>
<p>Layer U SPVs operate as jurisdictionally localised companies, not as global decentralised autonomous organisations. Each SPV is governed by its participants ; including investors, operators, local participants, and approved community representatives ; within the legal and regulatory framework of its jurisdiction.</p>
<p>SPV-level governance decisions include: spatial lease pricing, local advertising standards, infrastructure investment, revenue distribution policy, and compliance with regional regulations. These decisions are made by SPV participants through structured voting processes appropriate to the corporate form of the entity.</p>
<p>The Strands protocol does not impose a single global governance model on Layer U. Each SPV adapts to its jurisdiction. A Singapore-registered SPV operates under Singapore corporate law. A Malaysian Sdn Bhd operates under Malaysian corporate law. The protocol provides the economic and attestation infrastructure; the SPV provides the legal and operational wrapper.</p>
<p>As the native chain matures, SPV governance actions ; votes, revenue distributions, lease transactions ; can settle on chain for auditability and transparency while the legal entity retains its jurisdictional standing. Over time, where local legal and regulatory frameworks permit, individual SPVs may explore transitioning toward DAO-based governance structures. This is not a default assumption ; it is a jurisdictionally dependent option that becomes available only where the regulatory environment favours it.</p>
<h2>Privacy Architecture</h2>
<p>Privacy in the Strands ecosystem operates on two complementary principles: data sovereignty at the edge, and zero-knowledge verification on chain.</p>
<h3>Data Sovereignty</h3>
<p>Meaningful personal and contextual data ; including interaction history, preference signals, agent interaction context, consent records, and attention patterns ; lives on device, held within the relevant local persistence and context layers provided by MyMory and EveryWear. Not all categories are stored in the same way or in the same structure, but the principle is uniform: personal data does not transit to centralised servers, does not settle on chain, and remains under user control. Only proofs, attestations, settlement records, provenance, and related verifiable outputs move to the chain where required.</p>
<p>This is not a policy commitment layered on top of conventional architecture. It is a structural consequence of the client-ledger model described in Chapter 7. The device holds the state. The chain confirms the truthfulness of that state without accessing the underlying data.</p>
<h3>Zero-Knowledge Verification</h3>
<p>The zk-SNARK architecture of the Strands chain allows transactions, identity attestations, and participation records to be validated without exposing the data they contain. A validator confirms that a proof is correct without learning what the proof represents.</p>
<p>This means that A.R.E. settlement can be verified without exposing individual attention behaviour. Trait Shard provenance can be confirmed without revealing the creative content of a Mait. Layer U lease transactions can be audited without requiring exposure of advertiser terms or user engagement data. Identity can be attested without revealing personal information.</p>
<p>The privacy model is not absolute anonymity. It is selective disclosure governed by user consent. Participants choose what to reveal, to whom, and under what conditions. The protocol enforces those choices cryptographically rather than relying on policy enforcement by a trusted third party.</p>
<h3>Consent Architecture</h3>
<p>Consent within Strands is explicit, informed, granular, and revocable. The A.R.E. consent pipeline described in Chapter 5 establishes the pattern: no data collection before onboarding completes, no consent bundling, no dark patterns, and revocation that takes immediate effect.</p>
<p>This consent architecture extends across the ecosystem. MyMory data licensing, Trait Shard marketplace activity, Layer U spatial interaction, and any future data-dependent service all operate under the same consent framework. The user grants consent per context, per purpose, and per duration ; and can revoke at any point without penalty.</p>
<h2>Regulatory Compliance</h2>
<p>Strands operates across multiple jurisdictions with different regulatory frameworks for data protection, financial services, advertising, and digital assets. The protocol does not assume uniform regulatory treatment across jurisdictions; the same economic or technical activity may be classified differently depending on local law, which is why operating wrappers remain jurisdiction-specific. The compliance model is designed to be adaptable rather than monolithic.</p>
<h3>Data Protection</h3>
<p>The client-ledger architecture and data sovereignty model are structurally aligned with the principles of GDPR, PDPA (Singapore), and comparable data protection frameworks. Personal data remains under user control on device. Processing occurs locally. Consent is explicit and revocable. Data minimisation is enforced by architecture, not by policy.</p>
<p>Where jurisdictional requirements mandate specific disclosure, retention, or reporting obligations, those obligations are met at the SPV or operating entity level rather than at the protocol level. The protocol provides the privacy infrastructure; the operating entity provides the compliance wrapper.</p>
<h3>Financial Regulation</h3>
<p>$KREDS is structured for network utility within the Strands ecosystem, with deployment phased to demonstrate real economic function before native circulation. The sequence ; fiat proof first, Jetton on TON second, native chain third ; is deliberately structured so that token utility is observable before the ecosystem depends on it.</p>
<p>Layer U SPVs that handle fiat settlement, advertising revenue, or investor funds operate under the financial regulatory framework of their respective jurisdictions. The Strands protocol does not substitute for or override local financial regulation. SPVs obtain whatever licences, registrations, or approvals their jurisdictions require.</p>
<h3>Advertising Standards</h3>
<p>Layer U spatial advertising operates within the advertising regulatory framework of each jurisdiction. SPV-level governance includes compliance with local advertising standards ; content restrictions, disclosure requirements, targeting limitations, and consumer protection obligations.</p>
<p>The A.R.E. consent architecture provides a structural foundation for advertising compliance: every interaction requires explicit user consent, attention data remains on device, and engagement verification occurs through zero-knowledge proofs rather than invasive tracking.</p>
<hr>
<p>Decentralisation proceeds as network maturity allows, while regulated operating wrappers remain in place wherever local law still requires accountable legal entities.</p>
`,
};

export default chapter;
