import React from 'react';
import { useState, useMemo, useEffect } from 'react';

// ────────────────────────────────────────────────────────────────────────────
// DATI ARTICOLI estratti dai PDF ufficiali
// ────────────────────────────────────────────────────────────────────────────
const ARTS_2016 = {
  35: {
    title:
      'Soglie di rilevanza comunitaria e metodi di calcolo  del valore stimato degli ap',
    text: 'Art. 35  \n(Soglie di rilevanza comunitaria e metodi di calcolo \ndel valore stimato degli appalti) \n1. Ai fini dell’applicazione del presente codice, le soglie di \nrilevanza comunitaria sono: \na) euro 5.382.000 per gli appalti pubblici di lavori \ne per le concessioni;  \nb) euro 140.000 per gli appalti pubblici di \nforniture, di servizi e per i concorsi pubblici di \nprogettazione aggiudicati dalle amministrazioni \naggiudicatrici che sono autorità governative \ncentrali indicate nell’allegato III; se gli appalti \npubblici di forniture sono aggiudicati da \namministrazioni aggiudicatrici operanti nel \nsettore della difesa, questa soglia si applica solo \nagli appalti concernenti i prodotti menzionati \nnell’allegato VIII;  \nc) euro 215.000 per gli appalti pubblici di \nforniture, di servizi e per i concorsi pubblici di \nprogettazione aggiudicati da amministrazioni \naggiudicatrici sub-centrali; tale soglia si applica \nanche agli appalti pubblici di forniture \naggiudicati dalle autorità governative centrali \nche operano nel settore della difesa, allorché tali \nappalti concernono prodotti non menzionati \nnell’allegato VIII;  \nd) euro 750.000 per gli appalti di servizi sociali e di \naltri servi',
  },
  56: {
    title: 'Aste elettroniche',
    text: 'Art. 56 \n(Aste elettroniche) \n1. Le stazioni appaltanti possono ricorrere ad aste elet-\ntroniche nelle quali vengono presentati nuovi prezzi, mo-\ndificati al ribasso o nuovi valori riguardanti taluni elemen-\nti delle offerte. A tal fine, le stazioni appaltanti struttura-\nno l’asta come un processo elettronico per fasi successi-\nve, che interviene dopo una prima valutazione completa \ndelle offerte e consente di classificarle sulla base di un \ntrattamento automatico. Gli appalti di servizi e di lavori \nche hanno per oggetto prestazioni intellettuali, come la \nprogettazione di lavori, che non possono essere classifi-\ncati in base ad un trattamento automatico, non sono og-\ngetto di aste elettroniche.  \n2. Nelle procedure aperte, ristrette o competitive con ne-\ngoziazione o nelle procedure negoziate precedute da \nun’indizione di gara, le stazioni appaltanti possono stabi-\nlire che l’aggiudicazione di un appalto sia preceduta da \nun’asta elettronica quando il contenuto dei documenti di \ngara, in particolare le specifiche tecniche, può essere fis-\nsato in maniera precisa. Alle stesse condizioni, esse pos-\nsono ricorrere all’asta elettronica in occasione della ria-\npertura del confronto co',
  },
  21: {
    title: 'Programma degli acquisti e programmazione dei  lavori pubblici',
    text: 'Art. 21 \n(Programma degli acquisti e programmazione dei \nlavori pubblici) \n1. Le amministrazioni aggiudicatrici adottano il pro-\ngramma biennale degli acquisti di beni e servizi e il pro-\ngramma triennale dei lavori pubblici, nonché i relativi ag-\ngiornamenti annuali. I programmi sono approvati nel ri-\nspetto dei documenti programmatori e in coerenza con il \nbilancio e, per gli enti locali, secondo le norme che disci-\nplinano la programmazione economico-finanziaria degli \nenti.  \n2. Le opere pubbliche incompiute sono inserite nella \nprogrammazione triennale di cui al comma 1, ai fini del \nloro completamento ovvero per l’individuazione di solu-\nzioni alternative quali il riutilizzo, anche ridimensionato, \nla cessione a titolo di corrispettivo per la realizzazione di \naltra opera pubblica, la vendita o la demolizione.  \n3. Il programma triennale dei lavori pubblici e i relativi \naggiornamenti annuali contengono i lavori il cui valore \nstimato sia pari o superiore a 100.000 euro e indicano, \nprevia attribuzione del codice unico di progetto di cui \nall’articolo 11, della legge 16 gennaio 2003, n. 3, i lavori \nda avviare nella prima annualità, per i quali deve essere \nriportata l’indica',
  },
  89: {
    title: 'Avvalimento',
    text: 'Art. 89 \n(Avvalimento) \n1. L’operatore economico, singolo o in raggruppamento \ndi cui all’articolo 45, per un determinato appalto, può \nsoddisfare la richiesta relativa al possesso dei requisiti di \ncarattere economico, finanziario, tecnico e professionale \ndi cui all’articolo 83, comma 1, lettere b) e c), necessari \n\nNuovo Codice appalti - decreto legislativo 50/2016 \na cura di BibLus-net  -  http://biblus.acca.it \n78 \nper partecipare ad una procedura di gara, e, in ogni caso, \ncon esclusione dei requisiti di cui all’articolo 80, avvalen-\ndosi delle capacità di altri soggetti, anche partecipanti al \nraggruppamento, a prescindere dalla natura giuridica dei \nsuoi legami con questi ultimi. Per quanto riguarda i criteri \nrelativi all’indicazione dei titoli di studio e professionali di \ncui all’allegato XVII, parte II, lettera f), o alle esperienze \nprofessionali pertinenti, gli operatori economici possono \ntuttavia avvalersi delle capacità di altri soggetti solo se \nquesti ultimi eseguono direttamente i lavori o i servizi per \ncui tali capacità sono richieste. L’operatore economico \nche vuole avvalersi delle capacità di altri soggetti allega, \noltre all’eventuale attestazione SOA dell',
  },
  205: {
    title: 'Accordo bonario per i lavori',
    text: 'Art. 205 \n(Accordo bonario per i lavori) \n1. Per i lavori pubblici di cui alla parte II, con esclusione \ndei contratti di cui alla parte IV titolo III, affidati da am-\nministrazioni aggiudicatrici ed enti aggiudicatori, ovvero \ndai concessionari, qualora in seguito all’iscrizione di riser-\nve sui documenti contabili, l’importo economico \ndell’opera possa variare tra il 5 ed il 15 per cento \n\nNuovo Codice appalti - decreto legislativo 50/2016 \na cura di BibLus-net  -  http://biblus.acca.it \n147 \ndell’importo contrattuale, al fine del raggiungimento di \nun accordo bonario si applicano le disposizioni di cui ai \ncommi da 2 a 6.  \n2. Il procedimento dell’accordo bonario riguarda tutte le \nriserve iscritte fino al momento dell’avvio del procedi-\nmento stesso e può essere reiterato quando le riserve \niscritte, ulteriori e diverse rispetto a quelle già esaminate, \nraggiungano nuovamente l’importo di cui al comma 1, \nnell’ambito comunque di un limite massimo complessivo \ndel 15 per cento dell’importo del contratto. Le domande \nche fanno valere pretese già oggetto di riserva, non pos-\nsono essere proposte per importi maggiori rispetto a \nquelli quantificati nelle riserve stesse. Non possono',
  },
  23: {
    title:
      'Livelli della progettazione per gli appalti, per le  concessioni di lavori nonch',
    text: 'Art. 23 \n(Livelli della progettazione per gli appalti, per le \nconcessioni di lavori nonché per i servizi) \n1. La progettazione in materia di lavori pubblici si artico-\nla, secondo tre livelli di successivi approfondimenti tecni-\nci, in progetto di fattibilità tecnica ed economica, proget-\nto definitivo e progetto esecutivo ed è intesa ad assicura-\nre:  \na) il soddisfacimento dei fabbisogni della \ncollettività;  \nb) la qualità architettonica e tecnico funzionale e di \nrelazione nel contesto dell’opera;  \nc) la conformità alle norme ambientali, \nurbanistiche e di tutela dei beni culturali e \npaesaggistici, nonché il rispetto di quanto \nprevisto dalla normativa in materia di tutela \ndella salute e della sicurezza;  \nd) un limitato consumo del suolo;  \ne) il rispetto dei vincoli idrogeologici, sismici e \nforestali nonché degli altri vincoli esistenti;  \nf) \nil risparmio e l’efficientamento ed il recupero \nenergetico nella realizzazione e nella successiva \nvita dell’opera, nonché la valutazione del ciclo di \nvita e della manutenibilità delle opere; \ng) la compatibilità con le preesistenze \narcheologiche;  \n\nNuovo Codice appalti - decreto legislativo 50/2016 \na cura di BibLus-net  -  ht',
  },
  54: {
    title: 'Accordi quadro',
    text: 'Art. 54 \n(Accordi quadro) \n1. Le stazioni appaltanti possono concludere accordi \nquadro nel rispetto delle procedure di cui al presente co-\ndice. La durata di un accordo quadro non supera i quat-\ntro anni per gli appalti nei settori ordinari e gli otto anni \nper gli appalti nei settori speciali, salvo in casi eccezionali, \ndebitamente motivati in relazione, in particolare, \nall’oggetto dell’accordo quadro.  \n2. Nei settori ordinari, gli appalti basati su un accordo \nquadro sono aggiudicati secondo le procedure previste \ndal presente comma e dai commi 3 e 4. Tali procedure \nsono applicabili solo tra le amministrazioni aggiudicatrici, \nindividuate nell’avviso di indizione di gara o nell’invito a \nconfermare interesse, e gli operatori economici parti \ndell’accordo quadro concluso. Gli appalti basati su un \naccordo quadro non comportano in nessun caso modifi-\nche sostanziali alle condizioni fissate nell’accordo quadro \nin particolare nel caso di cui al comma 3.  \n3. Nell’ambito di un accordo quadro concluso con un \nsolo operatore economico, gli appalti sono aggiudicati \nentro i limiti delle condizioni fissate nell’accordo quadro \nstesso. L’amministrazione aggiudicatrice può consultare ',
  },
  104: {
    title: 'Garanzie per l’esecuzione di lavori di particolare  valore',
    text: 'Art. 104 \n(Garanzie per l’esecuzione di lavori di particolare \nvalore) \n1. Per gli affidamenti a contraente generale di qualunque \nammontare, e, ove prevista dal bando o dall’avviso di ga-\nra, per gli appalti di ammontare a base d’asta superiore a \n100 milioni di euro, il soggetto aggiudicatario presenta \nsotto forma di cauzione o di fideiussione rilasciata dai \nsoggetti di cui all’articolo 93 comma 3, in luogo della ga-\nranzia definitiva di cui all’articolo 103, una garanzia \ndell’adempimento di tutte le obbligazioni del contratto e \ndel risarcimento dei danni derivanti dall’eventuale ina-\ndempimento delle obbligazioni stesse, denominata "ga-\nranzia di buon adempimento" e una garanzia di conclu-\nsione dell’opera nei casi di risoluzione del contrato previ-\nsti dal codice civile e dal presente codice, denominata \n"garanzia per la risoluzione".  \n2. Nel caso di affidamento dei lavori ad un nuovo sogget-\nto, anche quest’ultimo presenta le garanzie previste al \ncomma 1.  \n3. La garanzia di buon adempimento è costituita con le \nmodalità di cui all’articolo 103 commi 1 e 2, ed è pari al \ncinque per cento fisso dell’importo contrattuale come \nrisultante dall’aggiudicazione senza applicazi',
  },
  213: {
    title: 'Autorità Nazionale Anticorruzione',
    text: 'Art. 213 \n(Autorità Nazionale Anticorruzione) \n1. La vigilanza e il controllo sui contratti pubblici e \nl’attività di regolazione degli stessi, sono attribuiti, nei li-\nmiti di quanto stabilito dal presente codice, all’Autorità \nnazionale anticorruzione (ANAC) di cui all’articolo 19 del \ndecreto legge 24 giugno 2014, n.90, convertito, con mo-\ndificazioni, dalla legge 11 agosto 2014, n. 114, che agisce \nanche al fine di prevenire e contrastare illegalità e corru-\nzione.  \n2. L’ANAC, attraverso linee guida, bandi-tipo, capitolati-\ntipo, contratti-tipo ed altri strumenti di regolazione fles-\nsibile, comunque denominati, garantisce la promozione \ndell’efficienza, della qualità dell’attività delle stazioni ap-\npaltanti, cui fornisce supporto anche facilitando lo scam-\nbio di informazioni e la omogeneità dei procedimenti \namministrativi e favorisce lo sviluppo delle migliori prati-\nche. Trasmette alle Camere, immediatamente dopo la lo-\nro adozione, gli atti di regolazione e gli altri atti di cui al \nprecedente periodo ritenuti maggiormente rilevanti in \ntermini di impatto, per numero di operatori potenzial-\nmente coinvolti, riconducibilità a fattispecie criminose, \nsituazioni anomale o c',
  },
  65: {
    title: 'Partenariato per l’innovazione',
    text: 'Art. 65 \n(Partenariato per l’innovazione) \n1. Le amministrazioni aggiudicatrici e gli enti aggiudicato-\nri possono ricorrere ai partenariati per l’innovazione nelle \nipotesi in cui l’esigenza di sviluppare prodotti, servizi o \nlavori innovativi e di acquistare successivamente le forni-\nture, i servizi o i lavori che ne risultano non può, in base \na una motivata determinazione, essere soddisfatta ricor-\nrendo a soluzioni già disponibili sul mercato, a condizio-\nne che le forniture, servizi o lavori che ne risultano, corri-\nspondano ai livelli di prestazioni e ai costi massimi con-\ncordati tra le stazioni appaltanti e i partecipanti.  \n2. Nei documenti di gara le amministrazioni aggiudicatrici \ne gli enti aggiudicatori fissano i requisiti minimi che tutti \ngli offerenti devono soddisfare, in modo sufficientemente \npreciso da permettere agli operatori economici di indivi-\nduare la natura e l’ambito della soluzione richiesta e deci-\ndere se partecipare alla procedura.  \n3. Nel partenariato per l’innovazione qualsiasi operatore \neconomico può formulare una domanda di partecipazio-\nne in risposta a un bando di gara o ad un avviso di indi-\nzione di gara, presentando le informazioni richie',
  },
  57: {
    title: 'Cataloghi elettronici',
    text: 'Art. 57 \n(Cataloghi elettronici) \nNel caso in cui sia richiesto l’uso di mezzi di comunica-\nzione elettronici, le stazioni appaltanti possono chiedere \nche le offerte siano presentate sotto forma di catalogo \nelettronico o che includano un catalogo elettronico. Le \nofferte presentate sotto forma di catalogo elettronico \npossono essere corredate di altri documenti, a completa-\nmento dell’offerta.  \n2. I cataloghi elettronici sono predisposti dai candidati o \ndagli offerenti per la partecipazione a una determinata \nprocedura di appalto in conformità alle specifiche tecni-\nche e al formato stabiliti dalle stazioni appaltanti. I cata-\nloghi elettronici, inoltre, soddisfano i requisiti previsti per \ngli strumenti di comunicazione elettronica nonché gli \neventuali requisiti supplementari stabiliti dalle stazioni \nappaltanti conformemente all’articolo 52.  \n3. Quando la presentazione delle offerte sotto forma di \ncataloghi elettronici è accettata o richiesta, le stazioni ap-\npaltanti:  \na) nei settori ordinari, lo indicano nel bando di gara o \nnell’invito a confermare interesse, quando il mezzo di in-\ndizione di gara è un avviso di preinformazione; nei settori \nspeciali, lo indicano nel b',
  },
  58: {
    title:
      'Procedure svolte attraverso piattaforme telematiche  di negoziazione',
    text: 'Art. 58 \n(Procedure svolte attraverso piattaforme telematiche \ndi negoziazione) \nAi sensi della normativa vigente in materia di documento \ninformatico e di firma digitale, nel rispetto dell’articolo \n52e dei principi di trasparenza, semplificazione ed effica-\ncia delle procedure, le stazioni appaltanti ricorrono a pro-\ncedure di gara interamente gestite con sistemi telematici \nnel rispetto delle disposizioni di cui al presente codice. \nL’utilizzo dei sistemi telematici non deve alterare la parità \ndi accesso agli operatori o impedire, limitare o distorcere \nla concorrenza o modificare l’oggetto dell’appalto, come \ndefinito dai documenti di gara.  \n2. Le stazioni appaltanti possono stabilire che \nl’aggiudicazione di una procedura interamente gestita con \nsistemi telematici avvenga con la presentazione di \nun’unica offerta ovvero attraverso un’asta elettronica alle \ncondizioni e secondo le modalità di cui all’articolo 56.  \n4. Il sistema telematico crea ed attribuisce in via automa-\ntica a ciascun operatore economico che partecipa alla \nprocedura un codice identificativo personale attraverso \nl’attribuzione di userID e password e di eventuali altri \ncodici individuali necessari per o',
  },
  44: {
    title: 'Digitalizzazione delle procedure',
    text: 'Art. 44 \n(Digitalizzazione delle procedure) \n1. Entro un anno dalla data di entrata in vigore del pre-\nsente codice, con decreto del Ministro per la semplifica-\nzione e la pubblica amministrazione, di concerto con il \nMinistro delle infrastrutture e dei trasporti e il Ministro \ndell’economia e delle finanze, sentita l’Agenzia per \nl’Italia Digitale (AGID) nonché dell’Autorità garante del-\nla privacy per i profili di competenza, sono definite le \nmodalità di digitalizzazione delle procedure di tutti i con-\ntratti pubblici, anche attraverso l’interconnessione per \ninteroperabilità dei dati delle pubbliche amministrazioni. \nSono, altresì, definite le migliori pratiche riguardanti me-\ntodologie organizzative e di lavoro, metodologie di pro-\ngrammazione \ne \npianificazione, \nriferite \nanche \nall’individuazione dei dati rilevanti, alla loro raccolta, ge-\nstione ed elaborazione, soluzioni informatiche, telemati-\nche e tecnologiche di supporto.  \n Torna su \n\nNuovo Codice appalti - decreto legislativo 50/2016 \na cura di BibLus-net  -  http://biblus.acca.it \n45',
  },
  95: {
    title: 'Criteri di aggiudicazione dell’appalto',
    text: 'Art. 95 \n(Criteri di aggiudicazione dell’appalto) \n1. I criteri di aggiudicazione non conferiscono alla stazio-\nne appaltante un potere di scelta illimitata dell’offerta. \nEssi garantiscono la possibilità di una concorrenza effet-\ntiva e sono accompagnati da specifiche che consentono \nl’efficace verifica delle informazioni fornite dagli offerenti \nal fine di valutare il grado di soddisfacimento dei criteri di \naggiudicazione delle offerte. Le stazioni appaltanti verifi-\ncano l’accuratezza delle informazioni e delle prove fornite \ndagli offerenti.  \n2. Fatte salve le disposizioni legislative, regolamentari o \namministrative relative al prezzo di determinate forniture \no alla remunerazione di servizi specifici, le stazioni appal-\ntanti, nel rispetto dei principi di trasparenza, di non di-\nscriminazione e di parità di trattamento, procedono \nall’aggiudicazione degli appalti e all’affidamento dei con-\ncorsi di progettazione e dei concorsi di idee, sulla base del \ncriterio dell’offerta economicamente più vantaggiosa in-\ndividuata sulla base del miglior rapporto qualità/prezzo o \nsulla base dell’elemento prezzo o del costo, seguendo un \ncriterio di comparazione costo/efficacia quale il c',
  },
  216: {
    title: 'Disposizioni transitorie e di coordinamento',
    text: 'Art. 216 \n(Disposizioni transitorie e di coordinamento) \n1. Fatto salvo quanto previsto nel presente articolo ovve-\nro nelle singole disposizioni di cui al presente codice, lo \nstesso si applica alle procedure e ai contratti per i quali i \nbandi o avvisi con cui si indice la procedura di scelta del \ncontraente siano pubblicati successivamente alla data del-\nla sua entrata in vigore nonché, in caso di contratti senza \npubblicazione di bandi o di avvisi, alle procedure e ai \ncontratti in relazione ai quali, alla data di entrata in vigore \ndel presente codice, non siano ancora stati inviati gli inviti \na presentare le offerte. \n1-bis. Per gli interventi ricompresi tra le infrastrutture \nstrategiche di cui alla disciplina prevista dall’articolo 163 e \nseguenti del decreto legislativo 12 aprile 2006, n. 163, già \ninseriti negli strumenti di programmazione approvati e \nper i quali la procedura di valutazione di impatto ambien-\ntale sia già stata avviata alla data di entrata in vigore del \npresente codice, i relativi progetti sono approvati secon-\ndo la disciplina previgente. Fatto salvo quanto previsto al \ncomma 4-bis, per le procedure di gara si applica quanto \nprevisto al comma 1.  \n2.',
  },
  107: {
    title: 'Sospensione',
    text: 'Art. 107 \n(Sospensione) \n1. In tutti i casi in cui ricorrano circostanze speciali che \nimpediscono in via temporanea che i lavori procedano \nutilmente a regola d’arte, e che non siano prevedibili al \nmomento della stipulazione del contratto, il direttore dei \nlavori può disporre la sospensione dell’esecuzione del \ncontratto, compilando, se possibile con l’intervento \ndell’esecutore o di un suo legale rappresentante, il verbale \ndi sospensione, con l’indicazione delle ragioni che hanno \ndeterminato l’interruzione dei lavori, nonché dello stato \ndi avanzamento dei lavori, delle opere la cui esecuzione \nrimane interrotta e delle cautele adottate affinché alla ri-\npresa le stesse possano essere continuate ed ultimate sen-\nza eccessivi oneri, della consistenza della forza lavoro e \ndei mezzi d’opera esistenti in cantiere al momento della \nsospensione. Il verbale è inoltrato al responsabile del \nprocedimento entro cinque giorni dalla data della sua re-\ndazione.  \n2. La sospensione può, altresì, essere disposta dal RUP \nper ragioni di necessità o di pubblico interesse, tra cui \nl’interruzione di finanziamenti per esigenze sopravvenute \ndi finanza pubblica, disposta con atto motivato delle',
  },
  59: {
    title: 'Scelta delle procedure e oggetto del contratto',
    text: 'Art. 59 \n(Scelta delle procedure e oggetto del contratto) \n1. Fermo restando quanto previsto dal titolo VII del de-\ncreto legislativo 3 luglio 2017, n. 117, nell’aggiudicazione \ndi appalti pubblici, le stazioni appaltanti utilizzano le pro-\ncedure aperte o ristrette, previa pubblicazione di un ban-\ndo o avviso di indizione di gara. Esse possono altresì uti-\nlizzare il partenariato per l’innovazione quando sussisto-\nno i presupposti previsti dall’articolo 65, la procedura \ncompetitiva con negoziazione e il dialogo competitivo \nquando sussistono i presupposti previsti dal comma 2 e la \nprocedura negoziata senza previa pubblicazione di un \nbando di gara quando sussistono i presupposti previsti \ndall’articolo 63. Fatto salvo quanto previsto al comma 1-\nbis, gli appalti relativi ai lavori sono affidati, ponendo a \nbase di gara il progetto esecutivo, il cui contenuto, come \ndefinito dall’articolo 23, comma 8, garantisce la rispon-\ndenza dell’opera ai requisiti di qualità predeterminati e il \nrispetto dei tempi e dei costi previsti.  \n[il seguente periodo è sospeso fino al 30 giugno \n2023] \nÈ vietato il ricorso all’affidamento congiunto della \nprogettazione e dell’esecuzione di lavori ad ',
  },
  27: {
    title: 'Procedure di approvazione dei progetti relativi ai  lavori',
    text: 'Art. 27 \n(Procedure di approvazione dei progetti relativi ai \nlavori) \n1. L’approvazione dei progetti da parte delle amministra-\nzioni viene effettuata in conformità alla legge 7 ago-\nsto1990, n. 241, e successive modificazioni, e alle disposi-\nzioni statali e regionali che regolano la materia. Si appli-\ncano le disposizioni in materia di conferenza di servizi \ndettate dagli articoli 14-bis e seguenti della citata legge n. \n241 del1990.  \n1-bis. Nei casi di appalti conseguenti al ritiro, alla revoca \no all’annullamento di un precedente appalto, basati su \nprogetti per i quali risultino scaduti i pareri, le autorizza-\nzioni e le intese acquisiti, ma non siano intervenute varia-\nzioni nel progetto e in materia di regolamentazione am-\nbientale, paesaggistica e antisismica né in materia di disci-\nplina urbanistica, restano confermati, per un periodo co-\nmunque non superiore a cinque anni, i citati predetti pa-\nreri, le autorizzazioni e le intese già resi dalle diverse am-\nministrazioni. L’assenza delle variazioni di cui al primo \nperiodo deve essere oggetto di specifica valutazione e at-\ntestazione da parte del RUP. Restano escluse le ipotesi in \ncui il ritiro, la revoca o l’annullamen',
  },
  48: {
    title:
      'Raggruppamenti temporanei e consorzi ordinari di  operatori economici',
    text: 'Art. 48 \n(Raggruppamenti temporanei e consorzi ordinari di \noperatori economici) \n1. Nel caso di lavori, per raggruppamento temporaneo di \ntipo verticale si intende una riunione di operatori econo-\nmici nell’ambito della quale uno di essi realizza i lavori \ndella categoria prevalente; per i lavori come definiti \nall’articolo 3, comma 1, lettera oo-ter), assumibili da uno \ndei mandanti; per raggruppamento di tipo orizzontale si \nintende una riunione di operatori economici finalizzata a \nrealizzare i lavori della stessa categoria.  \n2. Nel caso di forniture o servizi, per raggruppamento di \ntipo verticale si intende un raggruppamento di operatori \neconomici in cui il mandatario esegue le prestazioni di \nservizi o di forniture indicati come principali anche in \ntermini economici, i mandanti quelle indicate come se-\ncondarie; per raggruppamento orizzontale quello in cui \ngli operatori economici eseguono il medesimo tipo di \nprestazione; le stazioni appaltanti indicano nel bando di \ngara la prestazione principale e quelle secondarie.  \n3. Nel caso di lavori, i raggruppamenti temporanei e i \nconsorzi ordinari di operatori economici sono ammessi \nse gli imprenditori partecipanti al raggru',
  },
  55: {
    title: 'Sistemi dinamici di acquisizione',
    text: 'Art. 55 \n(Sistemi dinamici di acquisizione) \n1. Per acquisti di uso corrente, le cui caratteristiche, così \ncome generalmente disponibili sul mercato, soddisfano le \nesigenze delle stazioni appaltanti, è possibile avvalersi di \n\nNuovo Codice appalti - decreto legislativo 50/2016 \na cura di BibLus-net  -  http://biblus.acca.it \n52 \nun sistema dinamico di acquisizione. Il sistema dinamico \ndi acquisizione è un procedimento interamente elettroni-\nco ed è aperto per tutto il periodo di efficacia a qualsiasi \noperatore economico che soddisfi i criteri di selezione. \nPuò essere diviso in categorie definite di prodotti, lavori \no servizi sulla base delle caratteristiche dell’appalto da \neseguire. Tali caratteristiche possono comprendere un \nriferimento al quantitativo massimo ammissibile degli ap-\npalti specifici successivi o a un’area geografica specifica in \ncui gli appalti saranno eseguiti.  \n2. Per l’aggiudicazione nell’ambito di un sistema dinami-\nco di acquisizione, le stazioni appaltanti seguono le nor-\nme previste per la procedura ristretta di cui all’articolo \n61.Tutti i candidati che soddisfano i criteri di selezione \nsono ammessi al sistema; il numero dei candidati ammes-\nsi no',
  },
  50: {
    title: 'Clausole sociali del bando di gara e degli avvisi',
    text: 'Art. 50 \n(Clausole sociali del bando di gara e degli avvisi) \n1. Per gli affidamenti dei contratti di concessione e di ap-\npalto di lavori e servizi diversi da quelli aventi natura in-\ntellettuale, con particolare riguardo a quelli relativi a con-\ntratti ad alta intensità di manodopera, i bandi di gara, gli \navvisi e gli inviti inseriscono, nel rispetto dei principi \ndell’Unione europea, specifiche clausole sociali volte a \npromuovere la stabilità occupazionale del personale im-\npiegato, prevedendo l’applicazione da parte \ndell’aggiudicatario, dei contratti collettivi di settore di cui \nall’articolo 51 del decreto legislativo 15 giugno 2015, n. \n81. I servizi ad alta intensità di manodopera sono quelli \nnei quali il costo della manodopera è pari almeno al 50 \nper cento dell’importo totale del contratto.  \n Torna su',
  },
  80: {
    title: 'Motivi di esclusione',
    text: 'Art. 80 \n(Motivi di esclusione) \n1. Costituisce motivo di esclusione di un operatore eco-\nnomico dalla partecipazione a una procedura d’appalto o \nconcessione, la condanna con sentenza definitiva o de-\ncreto penale di condanna divenuto irrevocabile o senten-\nza di applicazione della pena su richiesta ai sensi \ndell’articolo 444 del codice di procedura penale, anche \nriferita a un suo subappaltatore nei casi di cui \nall’articolo 105, comma 6, per uno dei seguenti reati: \na) delitti, consumati o tentati, di cui agli articoli 416, 416-\nbis del codice penale ovvero delitti commessi avvalendosi \ndelle condizioni previste dal predetto articolo 416-bis ov-\nvero al fine di agevolare l’attività delle associazioni previ-\nste dallo stesso articolo, nonché per i delitti, consumati o \ntentati, previsti dall’articolo 74 del decreto del Presidente \ndella Repubblica 9 ottobre 1990, n. 309, dall’articolo 291-\nquater del decreto del Presidente della Repubblica 23 \ngennaio 1973, n. 43 e dall’articolo 260 del decreto legisla-\ntivo 3 aprile 2006, n. 152, in quanto riconducibili alla par-\ntecipazione a un’organizzazione criminale, quale definita \nall’articolo 2 della decisione quadro 2008/841/GAI del \nC',
  },
  102: {
    title: 'Collaudo e verifica di conformità',
    text: 'Art. 102 \n(Collaudo e verifica di conformità) \n1. Il responsabile unico del procedimento controlla \nl’esecuzione del contratto congiuntamente al direttore dei \nlavori per i lavori e al direttore dell’esecuzione del con-\ntratto per i servizi e forniture.  \n2. I contratti pubblici sono soggetti a collaudo per i lavori \ne a verifica di conformità per i servizi e per le forniture, \nper certificare che l’oggetto del contratto in termini di \nprestazioni, obiettivi e caratteristiche tecniche, economi-\nche e qualitative sia stato realizzato ed eseguito nel rispet-\nto delle previsioni e delle pattuizioni contrattuali. Per i \ncontratti pubblici di lavori di importo superiore a 1 mi-\nlione di euro e inferiore alla soglia di cui all’articolo 35 il \ncertificato di collaudo, nei casi espressamente individuati \ndal decreto di cui al comma 8, può essere sostituito dal \ncertificato di regolare esecuzione rilasciato per i lavori dal \ndirettore dei lavori. Per i lavori di importo pari o inferiore \na 1 milione di euro e per forniture e servizi di importo \ninferiore alla soglia di cui all’articolo 35, è sempre facoltà \ndella stazione appaltante sostituire il certificato di collau-\ndo o il certificato d',
  },
  60: {
    title: 'Procedura aperta',
    text: 'Art. 60 \n(Procedura aperta) \n1. Nelle procedure aperte, qualsiasi operatore economico \ninteressato può presentare un’offerta in risposta a un av-\nviso di indizione di gara. Il termine minimo per la rice-\nzione delle offerte è di trentacinque giorni dalla data di \ntrasmissione del bando di gara. Le offerte sono accompa-\ngnate dalle informazioni richieste dall’amministrazione \naggiudicatrice per la selezione qualitativa.  \n2. Nel caso in cui le amministrazioni aggiudicatrici abbia-\nno pubblicato un avviso di preinformazione che non sia \nstato usato come mezzo di indizione di una gara, il ter-\nmine minimo per la ricezione delle offerte, come stabilito \nal comma 1, può essere ridotto a quindici giorni purché \nsiano rispettate tutte le seguenti condizioni:  \na) l’avviso di preinformazione contiene tutte le \ninformazioni richieste per il bando di gara di cui \nall’allegato XIV, parte I, lettera B, sezione B1, \nsempreché queste siano disponibili al momento \ndella pubblicazione dell’avviso di \npreinformazione;  \nb) l’avviso di preinformazione è stato inviato alla \npubblicazione da non meno di trentacinque \ngiorni e non oltre dodici mesi prima della data \ndi trasmissione del bando di gara.  ',
  },
  220: {
    title: 'Entrata in vigore',
    text: 'Art. 220 \n(Entrata in vigore) \nIl presente codice entra in vigore il giorno stesso della sua \npubblicazione nella Gazzetta Ufficiale.  \nIl presente decreto, munito del sigillo dello Stato, sarà \ninserito nella Raccolta ufficiale degli atti normativi della \nRepubblica italiana. è fatto obbligo a chiunque spetti di \nosservarlo e di farlo osservare.  \n Torna su \n \nDato a Roma, addì 18 aprile 2016 \n \nMATTARELLA \n \nRenzi, Presidente del Consiglio dei \nministri e, ad interim, Ministro \ndello sviluppo economico \n \nDelrio, Ministro delle \ninfrastrutture e dei trasporti \n \nVisto, il Guardasigilli: Orlando \n\n—  222  —\nSupplemento ordinario n. 10/L alla GAZZETTA UFFICIALE\nSerie generale - n. 91\n19-4-2016\n \n \n\n—  223  —\nSupplemento ordinario n. 10/L alla GAZZETTA UFFICIALE\nSerie generale - n. 91\n19-4-2016\n \n \n\n—  224  —\nSupplemento ordinario n. 10/L alla GAZZETTA UFFICIALE\nSerie generale - n. 91\n19-4-2016\n \n \n\n—  225  —\nSupplemento ordinario n. 10/L alla GAZZETTA UFFICIALE\nSerie generale - n. 91\n19-4-2016\n \n \n\n—  226  —\nSupplemento ordinario n. 10/L alla GAZZETTA UFFICIALE\nSerie generale - n. 91\n19-4-2016\n \n \n\n—  227  —\nSupplemento ordinario n. 10/L alla GAZZETTA UFFICIALE\nSerie generale - n.',
  },
  77: {
    title: 'Commissione giudicatrice',
    text: 'Art. 77 \n(Commissione giudicatrice) \n1. Nelle procedure di aggiudicazione di contratti di appal-\nti o di concessioni, limitatamente ai casi di aggiudicazione \ncon il criterio dell’offerta economicamente più vantaggio-\nsa la valutazione delle offerte dal punto di vista tecnico \ned economico è affidata ad una commissione giudicatrice, \ncomposta da esperti nello specifico settore cui afferisce \nl’oggetto del contratto.  \n2. La commissione è costituta da un numero dispari di \ncommissari, non superiore a cinque, individuato dalla sta-\nzione appaltante e può lavorare di regola, lavora a di-\nstanza con procedure telematiche che salvaguardino la \nriservatezza delle comunicazioni. \n[il seguente comma 3 è sospeso fino al 30 giu-\ngno 2023] \n \n3. I commissari sono scelti fra gli esperti iscritti \nall’Albo istituito presso l’ANAC di cui all’articolo 78 \ne, nel caso di procedure di aggiudicazione svolte da \nCONSIP S.p.a, INVITALIA - Agenzia nazionale \nper l’attrazione degli investimenti e lo sviluppo \nd’impresa S.p.a. e dai soggetti aggregatori regionali \ndi cui all’articolo 9 del decreto legge 24 aprile 2014, \nn. 66, convertito, con modificazioni, dalla legge 23 \ngiugno 2014, n. 89, tra gli esp',
  },
  30: {
    title:
      'Principi per l’aggiudicazione e l’esecuzione di appalti  e concessioni',
    text: 'Art. 30 \n(Principi per l’aggiudicazione e l’esecuzione di appalti \ne concessioni) \n1. L’affidamento e l’esecuzione di appalti di opere, lavori, \nservizi, forniture e concessioni, ai sensi del presente codi-\nce garantisce la qualità delle prestazioni e si svolge nel \nrispetto dei principi di economicità, efficacia, tempestività \ne correttezza. Nell’affidamento degli appalti e delle con-\ncessioni, le stazioni appaltanti rispettano, altresì, i principi \ndi libera concorrenza, non discriminazione, trasparenza, \nproporzionalità, nonché di pubblicità con le modalità in-\ndicate nel presente codice. Il principio di economicità \npuò essere subordinato, nei limiti in cui è espressamente \nconsentito dalle norme vigenti e dal presente codice, ai \ncriteri, previsti nel bando, ispirati a esigenze sociali, non-\nché alla tutela della salute, dell’ambiente, del patrimonio \nculturale e alla promozione dello sviluppo sostenibile, \nanche dal punto di vista energetico.  \n2. Le stazioni appaltanti non possono limitare in alcun \nmodo artificiosamente la concorrenza allo scopo di favo-\nrire o svantaggiare indebitamente taluni operatori eco-\nnomici o, nelle procedure di aggiudicazione delle conces-\nsioni, ',
  },
  183: {
    title: 'Finanza di progetto',
    text: 'Art. 183 \n(Finanza di progetto) \n1. Per la realizzazione di lavori pubblici o di lavori di \npubblica utilità, ivi inclusi quelli relativi alle strutture de-\ndicate alla nautica da diporto, inseriti negli strumenti di \nprogrammazione formalmente approvati \ndall’amministrazione aggiudicatrice sulla base della nor-\nmativa vigente, ivi inclusi i Piani dei porti, finanziabili in \ntutto o in parte con capitali privati, le amministrazioni \naggiudicatrici possono, in alternativa all’affidamento me-\ndiante concessione ai sensi della parte III, affidare una \nconcessione ponendo a base di gara il progetto di fattibi-\nlità, mediante pubblicazione di un bando finalizzato alla \npresentazione di offerte che contemplino l’utilizzo di ri-\nsorse totalmente o parzialmente a carico dei soggetti pro-\nponenti. In ogni caso per le infrastrutture afferenti le \nopere in linea, è necessario che le relative proposte siano \nricomprese negli strumenti di programmazione approvati \ndal Ministero delle infrastrutture e dei trasporti.  \n2. Il bando di gara è pubblicato con le modalità di cui \nall’articolo 72 ovvero di cui all’articolo 36, comma 9, se-\ncondo l’importo dei lavori, ponendo a base di gara il pro-\ngett',
  },
  210: {
    title: 'Camera arbitrale, albo degli arbitri ed elenco dei  segretari',
    text: 'Art. 210 \n(Camera arbitrale, albo degli arbitri ed elenco dei \nsegretari) \n1. Presso l’ANAC è istituita la Camera arbitrale per i con-\ntratti pubblici relativi a lavori, servizi, forniture, di seguito \ncamera arbitrale.  \n2. La Camera arbitrale cura la formazione e la tenuta \ndell’Albo degli arbitri per i contratti pubblici, redige il co-\ndice deontologico degli arbitri camerali e provvede agli \nadempimenti necessari alla costituzione e al funziona-\nmento del collegio arbitrale.  \n3. Sono organi della Camera arbitrale il Presidente e il \nconsiglio arbitrale.  \n4. Il consiglio arbitrale, composto da cinque membri, è \nnominato dall’ANAC fra soggetti dotati di particolare \ncompetenza nella materia dei contratti pubblici di lavori, \nservizi e forniture, al fine di garantire l’indipendenza e \nl’autonomia dell’istituto, nonché dotati dei requisiti di \nonorabilità stabiliti dalla medesima Autorità. Al suo in-\nterno, l’ANAC sceglie il Presidente. L’incarico ha durata \nquinquennale ed è retribuito nella misura determinata dal \nprovvedimento di nomina nei limiti delle risorse attribuite \nall’Autorità stessa. Il Presidente e i consiglieri sono sog-\ngetti alle incompatibilità e ai divieti prev',
  },
  85: {
    title: 'Documento di gara unico europeo',
    text: 'Art. 85 \n(Documento di gara unico europeo) \n1. Al momento della presentazione delle domande di par-\ntecipazione o delle offerte, le stazioni appaltanti accettano \nil documento di gara unico europeo (DGUE), redatto in \nconformità al modello di formulario approvato con rego-\nlamento dalla Commissione europea Il DGUE è fornito \nesclusivamente in forma elettronica a partire dal18 aprile \n2018, e consiste in un’autodichiarazione aggiornata come \nprova documentale preliminare in sostituzione dei certifi-\ncati rilasciati da autorità pubbliche o terzi in cui si con-\nferma che l’operatore economico soddisfa le seguenti \ncondizioni:  \na) non si trova in una delle situazioni di cui \nall’articolo 80;  \nb) soddisfa i criteri di selezione definiti a norma \ndell’articolo83;  \nc) soddisfa gli eventuali criteri oggettivi fissati a \nnorma dell’articolo91.  \n2. Il DGUE fornisce, inoltre, le informazioni rilevanti \nrichieste dalla stazione appaltante e le informazioni di cui \nal comma 1 relative agli eventuali soggetti di cui \nl’operatore economico si avvale ai sensi dell’articolo 89, \nindica l’autorità pubblica o il terzo responsabile del rila-\nscio dei documenti complementari e include una dichia-\nr',
  },
  103: {
    title: 'Garanzie definitive',
    text: 'Art. 103 \n(Garanzie definitive) \n1. L’appaltatore per la sottoscrizione del contratto deve \ncostituire una garanzia, denominata "garanzia definitiva" \na sua scelta sotto forma di cauzione o fideiussione con le \nmodalità di cui all’articolo 93, commi 2 e 3, pari al 10 per \ncento dell’importo contrattuale e tale obbligazione è indi-\ncata negli atti e documenti a base di affidamento di lavori, \ndi servizi e di forniture. Nel caso di procedure di gara rea-\nlizzate in forma aggregata da centrali di committenza, \nl’importo della garanzia è indicato nella misura massima \ndel 10 per cento dell’importo contrattuale. Al fine di sal-\nvaguardare l’interesse pubblico alla conclusione del con-\ntratto nei termini e nei modi programmati in caso di ag-\ngiudicazione con ribassi superiori al dieci per cento la ga-\nranzia da costituire è aumentata di tanti punti percentuali \nquanti sono quelli eccedenti il 10 per cento. Ove il ribas-\nso sia superiore al venti per cento, l’aumento è di due \npunti percentuali per ogni punto di ribasso superiore al \n\nNuovo Codice appalti - decreto legislativo 50/2016 \na cura di BibLus-net  -  http://biblus.acca.it \n89 \nventi per cento. La cauzione è prestata a garanzia \n',
  },
  4: {
    title: 'Principi relativi all’affidamento di contratti pubblici  esclusi',
    text: 'Art. 4 \n(Principi relativi all’affidamento di contratti pubblici \nesclusi) \n1. L’affidamento dei contratti pubblici aventi ad oggetto \nlavori, servizi e forniture dei contratti attivi, esclusi, in \ntutto o in parte, dall’ambito di applicazione oggettiva del \npresente codice, avviene nel rispetto dei principi di eco-\nnomicità, efficacia, imparzialità, parità di trattamento, tra-\nsparenza, proporzionalità, pubblicità, tutela dell’ambiente \ned efficienza energetica.  \n Torna su \nArt. 5 \n(Principi comuni in materia di esclusione per \nconcessioni, appalti pubblici e accordi tra enti e \namministrazioni aggiudicatrici nell’ambito del settore \npubblico) \n1. Una concessione o un appalto pubblico, nei settori or-\ndinari o speciali, aggiudicati da un’amministrazione ag-\ngiudicatrice o da un ente aggiudicatore a una persona giu-\nridica di diritto pubblico o di diritto privato, non rientra \nnell’ambito di applicazione del presente codice quando \nsono soddisfatte tutte le seguenti condizioni:  \na) l’amministrazione aggiudicatrice o l’ente \naggiudicatore esercita sulla persona giuridica di \ncui trattasi un controllo analogo a quello \nesercitato sui propri servizi;  \nb) oltre l’80 per cento delle',
  },
  108: {
    title: 'Risoluzione',
    text: 'Art. 108 \n(Risoluzione) \n1. Fatto salvo quanto previsto ai commi 1, 2 e 4, \ndell’articolo 107, le stazioni appaltanti possono risolvere \nun contratto pubblico durante il periodo di sua efficacia, \nse una o più delle seguenti condizioni sono soddisfatte:  \na) il contratto ha subito una modifica sostanziale \nche avrebbe richiesto una nuova procedura di \nappalto ai sensi dell’articolo 106;  \nb) con riferimento alle modificazioni di cui \nall’articolo 106, comma 1, lettere b) e c) sono \nstate superate le soglie di cui al comma 7 del \npredetto articolo; con riferimento alle modifica-\nzioni di cui all’articolo 106, comma 1, lettera e) \ndel predetto articolo, sono state superate even-\ntuali soglie stabilite dalle amministrazioni aggiu-\ndicatrici o dagli enti aggiudicatori; con riferi-\nmento alle modificazioni di cui all’articolo 106, \ncomma 2, sono state superate le soglie di cui al \nmedesimo comma 2, lettere a) e b);  \nc) l’aggiudicatario si è trovato, al momento \ndell’aggiudicazione dell’appalto in una delle si-\ntuazioni di cui all’articolo 80, comma 1, sia per \nquanto riguarda i settori ordinari, sia per quanto \nriguarda le concessioni e avrebbe dovuto per-\ntanto essere escluso dalla pr',
  },
  106: {
    title: 'Modifica di contratti durante il periodo di efficacia',
    text: 'Art. 106 \n(Modifica di contratti durante il periodo di efficacia) \n1. Le modifiche, nonché le varianti, dei contratti di appal-\nto in corso di validità devono essere autorizzate dal RUP \ncon le modalità previste dall’ordinamento della stazione \nappaltante cui il RUP dipende. I contratti di appalto nei \nsettori ordinari e nei settori speciali possono essere modi-\nficati senza una nuova procedura di affidamento nei casi \nseguenti:  \na) se le modifiche, a prescindere dal loro valore \nmonetario, sono state previste nei documenti di \ngara iniziali in clausole chiare, precise e inequi-\nvocabili, che possono comprendere clausole di \nrevisione dei prezzi. Tali clausole fissano la por-\ntata e la natura di eventuali modifiche nonché le \ncondizioni alle quali esse possono essere impie-\ngate, facendo riferimento alle variazioni dei \nprezzi e dei costi standard, ove definiti. Esse \nnon apportano modifiche che avrebbero \nl’effetto di alterare la natura generale del con-\ntratto o dell’accordo quadro. Per i contratti rela-\ntivi ai lavori, le variazioni di prezzo in aumento \no in diminuzione possono essere valutate, sulla \nbase dei prezzari di cui all’articolo 23, comma 7, \nsolo per l’eccedenza ris',
  },
  204: {
    title: 'Ricorsi giurisdizionali',
    text: 'Art. 204 \n(Ricorsi giurisdizionali) \n1. All’articolo 120 del codice del processo amministrati-\nvo, di cui all’Allegato 1 al decreto legislativo 2 luglio \n2010, n. 104, sono apportate le seguenti modificazioni:  \na) al comma 1 le parole «nonché i connessi provvedimen-\nti dell’Autorità per la vigilanza sui contratti pubblici di \nlavori, servizi e forniture» sono sostituite dalle parole \n«nonché i provvedimenti dell’Autorità nazionale anticor-\nruzione ad essi riferiti»;  \nb) dopo il comma 2 è aggiunto il seguente:  \n«2-bis. Il provvedimento che determina le esclusioni dalla \nprocedura di affidamento e le ammissioni ad essa all’esito \ndella valutazione dei requisiti soggettivi, economico-\nfinanziari e tecnico-professionali va impugnato nel termi-\nne di trenta giorni, decorrente dalla sua pubblicazione sul \nprofilo del committente della stazione appaltante, ai sensi \ndell’articolo 29, comma 1, del codice dei contratti pubbli-\nci adottato in attuazione della legge 28 gennaio 2016, n. \n11. L’omessa impugnazione preclude la facoltà di far va-\nlere l’illegittimità derivata dei successivi atti delle proce-\ndure di affidamento, anche con ricorso incidentale. è al-\ntresì inammissibile l’impugn',
  },
  206: {
    title: 'Accordo bonario per i servizi e le forniture',
    text: 'Art. 206 \n(Accordo bonario per i servizi e le forniture) \n1. Le disposizioni di cui all’articolo 205 si applicano, in \nquanto compatibili, anche ai contratti di fornitura di beni \ndi natura continuativa o periodica, e di servizi, quando \ninsorgano controversie in fase esecutiva degli stessi, circa \nl’esatta esecuzione delle prestazioni dovute.  \n Torna su',
  },
  93: {
    title: 'Garanzie per la partecipazione alla procedura',
    text: 'Art. 93 \n(Garanzie per la partecipazione alla procedura) \n1. L’offerta è corredata da una garanzia fideiussoria, de-\nnominata "garanzia provvisoria" pari al2percento del \nprezzo base indicato nel bando o nell’invito, sotto forma \ndi cauzione o di fideiussione, a scelta dell’offerente. Al \nfine di rendere l’importo della garanzia proporzionato e \nadeguato alla natura delle prestazioni oggetto del contrat-\nto e al grado di rischio ad esso connesso, la stazione ap-\npaltante può motivatamente ridurre l’importo della cau-\nzione sino all’1 per cento ovvero incrementarlo sino al 4 \nper cento. Nel caso di procedure di gara realizzate in \nforma aggregata da centrali di committenza, l’importo \ndella garanzia è fissato nel bando o nell’invito nella misu-\nra massima del 2 per cento del prezzo base. In caso di \npartecipazione alla gara di un raggruppamento tempora-\nneo di imprese, la garanzia fideiussoria deve riguardare \ntutte le imprese del raggruppamento medesimo. Nei casi \ndi cui all’articolo 36, comma 2, lettera a), è facoltà della \nstazione appaltante non richiedere le garanzie di cui al \npresente articolo.  \n2. Fermo restando il limite all’utilizzo del contante di cui \nall’articolo 49, c',
  },
  26: {
    title: 'Verifica preventiva della progettazione',
    text: 'Art. 26 \n(Verifica preventiva della progettazione) \n1. La stazione appaltante, nei contratti relativi ai lavori, \nverifica la rispondenza degli elaborati progettuali ai do-\ncumenti di cui all’articolo 23, nonché la loro conformità \nalla normativa vigente. \n2. La verifica di cui al comma 1 ha luogo prima dell’inizio \ndelle procedure di affidamento; nei casi in cui è consenti-\nto l’affidamento congiunto di progettazione ed esecuzio-\nne, la verifica della progettazione redatta \ndall’aggiudicatario ha luogo prima dell’inizio dei lavori. \n3. Al fine di accertare l’unità progettuale, i soggetti di cui \nal comma 6, prima dell’approvazione e in contraddittorio \ncon il progettista, verificano la conformità del progetto \nesecutivo o definitivo rispettivamente, al progetto defini-\ntivo o al progetto di fattibilità. Al contraddittorio parteci-\npa anche il progettista autore del progetto posto a base \ndella gara, che si esprime in ordine a tale conformità.  \n4. La verifica accerta in particolare:  \n\nNuovo Codice appalti - decreto legislativo 50/2016 \na cura di BibLus-net  -  http://biblus.acca.it \n29 \na) la completezza della progettazione;  \nb) la coerenza e completezza del quadro \neconomico in',
  },
  114: {
    title: 'Norme applicabili e ambito soggettivo',
    text: 'Art. 114 \n(Norme applicabili e ambito soggettivo) \n1. Ai contratti pubblici di cui al presente Capo si applica-\nno le norme che seguono e, in quanto compatibili, le di-\nsposizioni di cui agli articoli da 1 a 58, ad esclusione delle \ndisposizioni relative alle concessioni. L’articolo 49 si ap-\nplica con riferimento agliallegati3, 4 e 5 e alle note gene-\nrali dell’Appendice 1 dell’Unione europea della AAP e \nagli altri accordi internazionali a cui l’Unione europea è \nvincolata.  \n2. Le disposizioni di cui al presente Capo si applicano agli \nenti aggiudicatori che sono amministrazioni aggiudicatrici \no imprese pubbliche che svolgono una delle attività pre-\nviste dagli articoli da 115 a 121; si applicano altresì ai tutti \ni soggetti che pur non essendo amministrazioni aggiudi-\ncatrici o imprese pubbliche, annoverano tra le loro attivi-\ntà una o più attività tra quelle previste dagli articoli da 115 \na 121 ed operano in virtù di diritti speciali o esclusivi.  \n3. Ai fini del presente articolo, per diritti speciali o esclu-\nsivi si intendono i diritti concessi dallo Stato o dagli enti \nlocali mediante disposizione legislativa, regolamentare o \namministrativa pubblicata compatibile con i ',
  },
  51: {
    title: 'Suddivisione in lotti',
    text: 'Art. 51 \n(Suddivisione in lotti) \n1. Nel rispetto della disciplina comunitaria in materia di \nappalti pubblici, sia nei settori ordinari che nei settori \nspeciali, al fine di favorire l’accesso delle microimprese, \npiccole e medie imprese, le stazioni appaltanti suddivido-\nno gli appalti in lotti funzionali di cui all’articolo 3, com-\nma 1, lettera qq), ovvero in lotti prestazionali di cui \nall’articolo 3, comma 1, lettera ggggg), in conformità alle \ncategorie o specializzazioni nel settore dei lavori, servizi e \nforniture. Le stazioni appaltanti motivano la mancata \nsuddivisione dell’appalto in lotti nel bando di gara o nella \nlettera di invito e nella relazione unica di cui agli articoli \n99 e 139. Nel caso di suddivisione in lotti, il relativo valo-\nre deve essere adeguato in modo da garantire l’effettiva \npossibilità di partecipazione da parte delle microimprese, \npiccole e medie imprese. è fatto divieto alle stazioni ap-\npaltanti di suddividere in lotti al solo fine di eludere \nl’applicazione delle disposizioni del presente codice, non-\nché di aggiudicare tramite l’aggregazione artificiosa degli \nappalti.  \n2. Le stazioni appaltanti indicano, altresì, nel bando di \ngara o nell',
  },
  64: {
    title: 'Dialogo competitivo',
    text: 'Art. 64 \n(Dialogo competitivo) \n1. Il provvedimento con cui le stazioni appaltanti di cui \nall’articolo 3, comma 1, lettera a), decidono di ricorrere al \ndialogo competitivo deve contenere specifica motivazio-\nne, i cui contenuti sono richiamati nella relazione unica di \ncui agli articoli 99 e 139 sulla sussistenza dei presupposti \nprevisti per il ricorso allo stesso. L’appalto è aggiudicato \nunicamente sulla base del criterio dell’offerta con il mi-\nglior rapporto qualità/prezzo conformemente all’articolo \n95, comma 6.  \n2. Nel dialogo competitivo qualsiasi operatore economico \npuò chiedere di partecipare in risposta a un bando di ga-\nra, o ad un avviso di indizione di gara, fornendo le in-\nformazioni richieste dalla stazione appaltante, per la sele-\nzione qualitativa.  \n3. Il termine minimo per la ricezione delle domande di \npartecipazione è di trenta giorni dalla data di trasmissione \ndel bando di gara o, nei settori speciali, se come mezzo di \n\nNuovo Codice appalti - decreto legislativo 50/2016 \na cura di BibLus-net  -  http://biblus.acca.it \n60 \nindizione di gara è usato un avviso sull’esistenza di un \nsistema di qualificazione, dell’invito a confermare interes-\nse. Soltanto g',
  },
  209: {
    title: 'Arbitrato',
    text: 'Art. 209 \n(Arbitrato) \n1. Le controversie su diritti soggettivi, derivanti \ndall’esecuzione dei contratti pubblici relativi a lavori, ser-\nvizi, forniture, concorsi di progettazione e di idee, com-\nprese quelle conseguenti al mancato raggiungimento \ndell’accordo bonario di cui agli articoli 205 e 206 possono \nessere deferite ad arbitri. L’arbitrato, ai sensi dell’articolo \n1, comma 20, della legge 6 novembre 2012, n. 190, si ap-\nplica anche alle controversie relative a concessioni e ap-\npalti pubblici di opere, servizi e forniture in cui sia parte \nuna società a partecipazione pubblica ovvero una società \ncontrollata o collegata a una società a partecipazione \npubblica, ai sensi dell’articolo 2359 del codice civile, o \n\nNuovo Codice appalti - decreto legislativo 50/2016 \na cura di BibLus-net  -  http://biblus.acca.it \n148 \nche comunque abbiano ad oggetto opere o forniture fi-\nnanziate con risorse a carico dei bilanci pubblici.  \n2. La stazione appaltante indica nel bando o nell’avviso \ncon cui indice la gara ovvero, per le procedure senza \nbando, nell’invito, se il contratto conterrà o meno la clau-\nsola compromissoria. L’aggiudicatario può ricusare la \nclausola compromissoria, che',
  },
  166: {
    title: 'Principio di libera amministrazione delle autorità  pubbliche',
    text: 'Art. 166 \n(Principio di libera amministrazione delle autorità \npubbliche) \n1. Le amministrazioni aggiudicatrici e gli enti aggiudicato-\nri sono liberi di organizzare la procedura per la scelta del \nconcessionario, fatto salvo il rispetto delle norme di cui \nalla presente Parte. Essi sono liberi di decidere il modo \nmigliore per gestire l’esecuzione dei lavori e la prestazio-\nne dei servizi per garantire in particolare un elevato livello \ndi qualità, sicurezza ed accessibilità, la parità di trattamen-\nto e la promozione dell’accesso universale e dei diritti \ndell’utenza nei servizi pubblici.  \n Torna su',
  },
  61: {
    title: 'Procedura ristretta',
    text: 'Art. 61 \n(Procedura ristretta) \n1. Nelle procedure ristrette qualsiasi operatore economi-\nco può presentare una domanda di partecipazione in ri-\nsposta a un avviso di indizione di gara contenente i dati \ndi cui all’allegato XIV, parte I, lettera B o C a seconda del \ncaso, fornendo le informazioni richieste \ndall’amministrazione aggiudicatrice ai fini della selezione \nqualitativa.  \n2. Il termine minimo per la ricezione delle domande di \npartecipazione è di trenta giorni dalla data di trasmissione \ndel bando di gara o, se è utilizzato un avviso di preinfor-\nmazione come mezzo di indizione di una gara, dalla data \nd’invio dell’invito a confermare interesse.  \n3. A seguito della valutazione da parte delle amministra-\nzioni aggiudicatrici delle informazioni fornite, soltanto gli \noperatori economici invitati possono presentare \nun’offerta. Le amministrazioni aggiudicatrici possono li-\nmitare il numero di candidati idonei da invitare a parteci-\npare alla procedura in conformità all’articolo 91. Il termi-\nne minimo per la ricezione delle offerte è di trenta giorni \ndalla data di trasmissione dell’invito a presentare offerte.  \n4. Nel caso in cui le amministrazioni aggiudicatrici hanno \np',
  },
  24: {
    title:
      'Progettazione interna e esterna alle amministrazioni  aggiudicatrici in materia ',
    text: 'Art. 24 \n(Progettazione interna e esterna alle amministrazioni \naggiudicatrici in materia di lavori pubblici) \n1. Le prestazioni relative alla progettazione di fattibilità \ntecnica ed economica, definitiva ed esecutiva di lavori, al \ncollaudo, al coordinamento della sicurezza della progetta-\nzione, nonché alla direzione dei lavori e agli incarichi di \nsupporto tecnico-amministrativo alle attività del respon-\nsabile del procedimento e del dirigente competente alla \nprogrammazione dei lavori pubblici sono espletate:  \na) dagli uffici tecnici delle stazioni appaltanti;  \nb) dagli uffici consortili di progettazione e di \ndirezione dei lavori che i comuni, i rispettivi \nconsorzi e unioni, le comunità montane, le \naziende sanitarie locali, i consorzi, gli enti di \nindustrializzazione e gli enti di bonifica possono \ncostituire;  \nc) dagli organismi di altre pubbliche \namministrazioni di cui le singole stazioni \nappaltanti possono avvalersi per legge;  \nd) dai soggetti di cui all’articolo 46.  \n2. Con il regolamento di cui all’articolo 216, comma 27-\nocties, sono definiti i requisiti che devono possedere i \nsoggetti di cui all’articolo 46, comma 1. Fino alla data di \nentrata in vigore del ',
  },
  78: {
    title: 'Albo dei componenti delle commissioni giudicatrici',
    text: 'Art. 78 \n(Albo dei componenti delle commissioni giudicatrici) \n1. è istituito presso l’ANAC, che lo gestisce e lo aggiorna \nsecondo criteri individuati con apposite determinazioni, \nl’Albo nazionale obbligatorio dei componenti delle com-\nmissioni giudicatrici nelle procedure di affidamento dei \ncontratti pubblici. Ai fini dell’iscrizione nel suddetto albo, \ni soggetti interessati devono essere in possesso di requisiti \ndi compatibilità e moralità, nonché di comprovata com-\npetenza e professionalità nello specifico settore a cui si \nriferisce il contratto, secondo i criteri e le modalità che \nl’Autorità definisce con apposite linee guida, valutando la \npossibilità di articolare l’Albo per aree tematiche omoge-\nnee, da adottare entro centoventi giorni dalla data di en-\ntrata in vigore del presente codice. Fino all’adozione della \ndisciplina in materia di iscrizione all’Albo, si applica \nl’articolo 216, comma 12.  \n1-bis. Con le linee guida di cui al comma 1 sono, altresì, \ndisciplinate le modalità di funzionamento delle commis-\nsioni giudicatrici, prevedendo, di norma, sedute pubbli-\nche, nonché sedute riservate per la valutazione delle of-\nferte tecniche e per altri eventuali adempi',
  },
  115: {
    title: 'Gas ed energia termica',
    text: 'Art. 115 \n(Gas ed energia termica ) \n1.Per quanto riguarda il gas e l’energia termica, il presente \ncapo si applica alle seguenti attività:  \na) la messa a disposizione o la gestione di reti fisse \ndestinate alla fornitura di un servizio al pubblico \nin connessione con la produzione, il trasporto o \nla distribuzione di gas o di energia termica;  \nb) l’alimentazione di tali reti con gas o energia ter-\nmica.  \n2.L’alimentazione con gas o energia termica di reti fisse \nche forniscono un servizio al pubblico da parte di un ente \naggiudicatore che non è un’amministrazione aggiudicatri-\nce non è considerata un’attività di cui al comma 1, se ri-\ncorrono tutte le seguenti condizioni:  \na) la produzione di gas o di energia termica da par-\nte di tale ente aggiudicatore è l’inevitabile risul-\ntato dell’esercizio di un’attività non prevista dal \ncomma 1 del presente articolo o dagli articoli da \n116 a 118;  \nb) l’alimentazione della rete pubblica mira solo a \nsfruttare economicamente tale produzione e \ncorrisponde al massimo al 20 per cento del fat-\nturato dell’ente aggiudicatore, considerando la \nmedia dell’ultimo triennio, compreso l’anno in \ncorso.  \n Torna su',
  },
  32: {
    title: 'Fasi delle procedure di affidamento',
    text: 'Art. 32 \n(Fasi delle procedure di affidamento) \n1. Le procedure di affidamento dei contratti pubblici \nhanno luogo nel rispetto degli atti di programmazione \ndelle stazioni appaltanti previsti dal presente codice o dal-\nle norme vigenti. \n2. Prima dell’avvio delle procedure di affidamento dei \ncontratti pubblici, le stazioni appaltanti, in conformità ai \npropri ordinamenti, decretano o determinano di contrar-\nre, individuando gli elementi essenziali del contratto e i \ncriteri di selezione degli operatori economici e delle offer-\nte. Nella procedura di cui all’articolo 36, comma 2, lettera \na) e b), la stazione appaltante può procedere ad affida-\nmento diretto tramite determina a contrarre, o atto equi-\nvalente, che contenga, in modo semplificato, l’oggetto \ndell’affidamento, l’importo, il fornitore, le ragioni della \nscelta del fornitore, il possesso da parte sua dei requisiti \ndi carattere generale, nonché il possesso dei requisiti tec-\nnico-professionali, ove richiesti. \n3. La selezione dei partecipanti e delle offerte avviene \nmediante uno dei sistemi e secondo i criteri previsti dal \npresente codice.  \n4. Ciascun concorrente non può presentare più di \nun’offerta. L’offerta è vi',
  },
  46: {
    title:
      'Operatori economici per l’affidamento dei servizi di  architettura e ingegneria',
    text: 'Art. 46 \n(Operatori economici per l’affidamento dei servizi di \narchitettura e ingegneria) \n1. Sono ammessi a partecipare alle procedure di affida-\nmento dei servizi attinenti all’architettura e all’ingegneria \nnel rispetto del principio di non discriminazione fra i \ndiversi soggetti sulla base della forma giuridica as-\nsunta: \na) i prestatori di servizi di ingegneria e architettura: i pro-\nfessionisti singoli, associati, le società tra professionisti di \ncui alla lettera b), le società di ingegneria di cui alla lettera \nc), i consorzi, i GEIE, i raggruppamenti temporanei fra i \npredetti soggetti che rendono a committenti pubblici e \nprivati, operando sul mercato, servizi di ingegneria e di \narchitettura, nonché attività tecnico-amministrative e stu-\ndi di fattibilità economico-finanziaria ad esse connesse, \nivi compresi, con riferimento agli interventi inerenti al \nrestauro e alla manutenzione di beni mobili e delle super-\nfici decorate di beni architettonici, i soggetti con qualifica \ndi restauratore di beni culturali ai sensi della vigente nor-\nmativa, gli archeologi professionisti, singoli e associati, e \nle società da essi costituite; \nb) le società di professionisti: le socie',
  },
  101: {
    title: 'Soggetti delle stazioni appaltanti',
    text: 'Art. 101 \n(Soggetti delle stazioni appaltanti) \n1. La esecuzione dei contratti aventi ad oggetto lavori, \nservizi, forniture, è diretta dal responsabile unico del pro-\ncedimento, che controllai livelli di qualità delle prestazio-\nni. Il responsabile unico del procedimento, nella fase \ndell’esecuzione, si avvale del direttore dell’esecuzione del \ncontratto o del direttore dei lavori, del coordinatore in \nmateria di salute e di sicurezza durante l’esecuzione pre-\nvisto dal decreto legislativo 9 aprile 2008, n. 81, nonché \ndel collaudatore ovvero della commissione di collaudo, \ndel verificatore della conformità e accerta il corretto ed \neffettivo svolgimento delle funzioni ad ognuno affidate.  \n2. Per il coordinamento, la direzione ed il controllo tecni-\nco-contabile dell’esecuzione dei contratti pubblici relativi \na lavori, le stazioni appaltanti individuano, prima \ndell’avvio delle procedure per l’affidamento, su proposta \ndel responsabile unico del procedimento, un direttore dei \nlavori che può essere coadiuvato, in relazione alla com-\nplessità dell’intervento, da uno o più direttori operativi e \nda ispettori di cantiere.  \n3. Il direttore dei lavori, con l’ufficio di direzione lav',
  },
  164: {
    title: 'Oggetto e ambito di applicazione',
    text: 'Art. 164 \n(Oggetto e ambito di applicazione) \n1. Ferme restando le disposizioni di cui all’articolo 346 \ndel TFUE, le disposizioni di cui alla presente Parte defi-\nniscono le norme applicabili alle procedure di aggiudica-\nzione dei contratti di concessione di lavori pubblici o di \nservizi indette dalle amministrazioni aggiudicatrici, non-\nché dagli enti aggiudicatori qualora i lavori o i servizi sia-\nno destinati ad una delle attività di cui all’allegato II. In \nogni caso, le disposizioni della presente Parte non si ap-\nplicano ai provvedimenti, comunque denominati, con cui \nle amministrazioni aggiudicatrici, a richiesta di un opera-\ntore economico, autorizzano, stabilendone le modalità e \nle condizioni, l’esercizio di un’attività economica che può \nsvolgersi anche mediante l’utilizzo di impianti o altri beni \nimmobili pubblici.  \n2.Alle procedure di aggiudicazione di contratti di conces-\nsione di lavori pubblici o di servizi si applicano, per quan-\nto compatibili, le disposizioni contenute nella parte I e \nnella parte II, del presente codice, relativamente ai prin-\ncipi generali, alle esclusioni, alle modalità e alle procedure \ndi affidamento, alle modalità di pubblicazione e reda',
  },
  52: {
    title: 'Regole applicabili alle comunicazioni',
    text: 'Art. 52 \n(Regole applicabili alle comunicazioni) \n1. Nei settori ordinari e nei settori speciali, tutte le comu-\nnicazioni e gli scambi di informazioni di cui al presente \ncodice sono eseguiti utilizzando mezzi di comunicazione \nelettronici in conformità con quanto disposto dal presen-\nte comma e dai commi da 2 a 9, nonché dal Codice \ndell’amministrazione digitale di cui al decreto legislativo 7 \nmarzo 2005, n. 82. Gli strumenti e i dispositivi da utiliz-\nzare per comunicare per via elettronica, nonché le relative \ncaratteristiche tecniche, hanno carattere non discrimina-\ntorio, sono comunemente disponibili e compatibili con i \nprodotti TIC generalmente in uso e non limitano \nl’accesso degli operatori economici alla procedura di ag-\ngiudicazione. In deroga al primo e secondo periodo, le \nstazioni appaltanti non sono obbligate a richiedere mezzi \ndi comunicazione elettronici nella procedura di presenta-\nzione dell’offerta esclusivamente nelle seguenti ipotesi:  \na) a causa della natura specialistica dell’appalto, l’uso di \nmezzi di comunicazione elettronici richiederebbe \nspecifici strumenti, dispositivi o formati di file che \nnon sono in genere disponibili o non sono gestiti \ndai p',
  },
  100: {
    title: 'Requisiti per l’esecuzione dell’appalto',
    text: 'Art. 100 \n(Requisiti per l’esecuzione dell’appalto) \n1. Le stazioni appaltanti possono richiedere requisiti par-\nticolari per l’esecuzione del contratto, purché siano com-\npatibili con il diritto europeo e con i principi di parità di \ntrattamento, non discriminazione, trasparenza, propor-\nzionalità, innovazione e siano precisate nel bando di gara, \no nell’invito in caso di procedure senza bando o nel capi-\ntolato d’oneri. Dette condizioni possono attenere, in par-\nticolare, a esigenze sociali e ambientali. \n2. In sede di offerta gli operatori economici dichiarano di \naccettare i requisiti particolari nell’ipotesi in cui risulte-\nranno aggiudicatari. \n Torna su',
  },
  84: {
    title:
      'Sistema unico di qualificazione degli esecutori di  lavori pubblici',
    text: 'Art. 84 \n(Sistema unico di qualificazione degli esecutori di \nlavori pubblici) \n1. Fermo restando quanto previsto dal comma 12 e \ndall’articolo 90, comma 8, i soggetti esecutori a qualsiasi \ntitolo di lavori pubblici di importo pari o superiore a \n150.000 euro, provano il possesso dei requisiti di qualifi-\ncazione di cui all’articolo 83, mediante attestazione da \nparte degli appositi organismi di diritto privato autorizzati \ndall’ANAC. L’attività di attestazione è esercitata nel ri-\nspetto del principio di indipendenza di giudizio, garan-\ntendo l’assenza di qualunque interesse commerciale o fi-\nnanziario che possa determinare comportamenti non im-\nparziali o discriminatori. Gli organismi di diritto privato \ndi cui al primo periodo, nell’esercizio dell’attività di atte-\nstazione per gli esecutori di lavori pubblici, svolgono \nfunzioni di natura pubblicistica, anche agli effetti \ndell’articolo 1 della legge 14 gennaio 1994, n. 20. \n2. Con il regolamento di cui all’articolo 216, comma 27-\nocties, sono, altresì, individuati; livelli standard di qualità \ndei controlli che le società organismi di attestazione \n(SOA) devono effettuare, con particolare riferimento a \nquelli di natura non m',
  },
  31: {
    title:
      'Ruolo e funzioni del responsabile del procedimento  negli appalti e nelle conces',
    text: 'Art. 31 \n(Ruolo e funzioni del responsabile del procedimento \nnegli appalti e nelle concessioni) \n1. Per ogni singola procedura per l’affidamento di un ap-\npalto o di una concessione le stazioni appaltanti indivi-\nduano nell’atto di adozione o di aggiornamento dei pro-\ngrammi di cui all’articolo 21, comma 1, ovvero nell’atto \ndi avvio relativo ad ogni singolo intervento, per le esigen-\nze non incluse in programmazione, un responsabile unico \ndel procedimento (RUP) per le fasi della programmazio-\nne, della progettazione, dell’affidamento, dell’esecuzione. \nLe stazioni appaltanti che ricorrono ai sistemi di acquisto \ne di negoziazione delle centrali di committenza nomina-\nno, per ciascuno dei detti acquisti, un responsabile del \nprocedimento che assume specificamente, in ordine al \nsingolo acquisto, il ruolo e le funzioni di cui al presente \narticolo. Fatto salvo quanto previsto al comma 10, il RUP \nè nominato; la sostituzione del RUP individuato nella \nprogrammazione di cui all’articolo 21, comma 1, non \ncomporta modifiche alla stessa con atto formale del sog-\ngetto responsabile dell’unità organizzativa, che deve esse-\nre di livello apicale, tra i dipendenti di ruolo addetti \nall’un',
  },
  96: {
    title: 'Costi del ciclo di vita',
    text: 'Art. 96 \n(Costi del ciclo di vita) \n1. I costi del ciclo di vita comprendono, in quanto perti-\nnenti, tutti i seguenti costi, o parti di essi, legati al ciclo di \nvita di un prodotto, di un servizio o di un lavoro:  \na) \ncosti sostenuti dall’amministrazione aggiudica-\ntrice o da altri utenti, quali:  \n1) \ncosti relativi all’acquisizione;  \n2) \ncosti connessi all’utilizzo, quali consu-\nmo di energia e altre risorse;  \n3) \ncosti di manutenzione;  \n4) \ncosti relativi al fine vita, come i costi di \nraccolta, di smaltimento e di riciclag-\ngio;  \nb) costi imputati a esternalità ambientali legate ai \nprodotti, servizi o lavori nel corso del ciclo di \nvita, purché il loro valore monetario possa esse-\nre determinato e verificato. Tali costi possono \nincludere i costi delle emissioni di gas a effetto \nserra e di altre sostanze inquinanti, nonché altri \ncosti legati all’attenuazione dei cambiamenti \nclimatici.  \n2. Quando valutano i costi utilizzando un sistema di costi \ndel ciclo di vita, le stazioni appaltanti indicano nei docu-\nmenti di gara i dati che gli offerenti devono fornire e il \nmetodo che la stazione appaltante impiegherà al fine di \ndeterminare i costi del ciclo di vita sulla bas',
  },
  62: {
    title: 'Procedura competitiva con negoziazione',
    text: 'Art. 62 \n(Procedura competitiva con negoziazione) \n1. Nelle procedure competitive con negoziazione qualsia-\nsi operatore economico può presentare una domanda di \npartecipazione in risposta a un avviso di indizione di gara \ncontenente le informazioni di cui all’allegato XIV, parte I, \nlettere B o C, fornendo le informazioni richieste \ndall’amministrazione aggiudicatrice per la selezione quali-\ntativa.  \n2. Nei documenti di gara le amministrazioni aggiudicatrici \nindividuano l’oggetto dell’appalto fornendo una descri-\nzione delle loro esigenze, illustrando le caratteristiche ri-\nchieste per le forniture, i lavori o i servizi da appaltare, \nspecificando i criteri per l’aggiudicazione dell’appalto e \nindicano altresì quali elementi della descrizione defini-\nscono i requisiti minimi che tutti gli offerenti devono \nsoddisfare.  \n3. Le informazioni fornite devono essere sufficientemen-\nte precise per permettere agli operatori economici di in-\ndividuare la natura e l’ambito dell’appalto e decidere se \npartecipare alla procedura.  \n4. Il termine minimo per la ricezione delle domande di \npartecipazione è di trenta giorni dalla data di trasmissione \ndel bando di gara o, se è utilizzato come m',
  },
  179: {
    title: 'Disciplina comune applicabile',
    text: 'Art. 179 \n(Disciplina comune applicabile) \n1. Alle procedure di affidamento di cui alla presente parte \nsi applicano le disposizioni di cui alla parte I, III, V e VI, \nin quanto compatibili.  \n2. Si applicano inoltre, in quanto compatibili con le previ-\nsioni della presente parte, le disposizioni della parte II, \ntitolo I a seconda che l’importo dei lavori sia pari o supe-\nriore alla soglia di cui all’articolo 35, ovvero inferiore, \nnonché le ulteriori disposizioni della parte II indicate \nall’articolo 164, comma 2.  \n3. Le disposizioni della presente parte si applicano, in \nquanto compatibili, anche ai servizi.  \n \nTITOLO I \nPARTENARIATO PUBBLICO \nPRIVATO \n Torna su',
  },
  47: {
    title: 'Requisiti per la partecipazione dei consorzi alle gare',
    text: 'Art. 47 \n(Requisiti per la partecipazione dei consorzi alle gare) \n1. I requisiti di idoneità tecnica e finanziaria per \nl’ammissione alle procedure di affidamento dei soggetti di \ncui all’articolo 45, comma 2, lettere b) e c), devono essere \nposseduti e comprovati dagli stessi con le modalità previ-\nste dal presente codice, salvo che per quelli relativi alla \ndisponibilità delle attrezzature e dei mezzi d’opera, non-\nché all’organico medio annuo, che sono computati cumu-\nlativamente in capo al consorzio ancorché posseduti dalle \nsingole imprese consorziate.  \n2. I consorzi stabili di cui agli articoli 45, comma 2, lettera \nc), e 46, comma 1, lettera f), eseguono le prestazioni o \ncon la propria struttura o tramite i consorziati indicati in \nsede di gara senza che ciò costituisca subappalto, ferma la \nresponsabilità solidale degli stessi nei confronti della sta-\nzione appaltante. Per i lavori, ai fini della qualificazione di \ncui all’articolo 84, con il regolamento di cui all’articolo \n216, comma 27-octies, sono stabiliti i criteri per \nl’imputazione delle prestazioni eseguite al consorzio o ai \nsingoli consorziati che eseguono le prestazioni. \nL’affidamento delle prestazioni da pa',
  },
  53: {
    title: 'Accesso agli atti e riservatezza',
    text: 'Art. 53 \n(Accesso agli atti e riservatezza) \n1. Salvo quanto espressamente previsto nel presente co-\ndice, il diritto di accesso agli atti delle procedure di affi-\ndamento e di esecuzione dei contratti pubblici, ivi com-\nprese le candidature e le offerte, è disciplinato dagli arti-\ncoli 22 e seguenti della legge 7 agosto 1990, n. 241. Il di-\nritto di accesso agli atti del processo di asta elettronica \npuò essere esercitato mediante l’interrogazione delle regi-\nstrazioni di sistema informatico che contengono la do-\ncumentazione in formato elettronico dei detti atti ovvero \ntramite l’invio ovvero la messa a disposizione di copia \nautentica degli atti.  \n2. Fatta salva la disciplina prevista dal presente codice per \ngli appalti secretati o la cui esecuzione richiede speciali \nmisure di sicurezza, il diritto di accesso è differito:  \na) nelle procedure aperte, in relazione all’elenco dei sog-\ngetti che hanno presentato offerte, fino alla scadenza del \ntermine per la presentazione delle medesime;  \nb) nelle procedure ristrette e negoziate e nelle gare infor-\nmali, in relazione all’elenco dei soggetti che hanno fatto \nrichiesta di invito o che hanno manifestato il loro interes-\nse, e in ',
  },
  36: {
    title: 'Contratti sotto soglia',
    text: 'Art. 36 \n(Contratti sotto soglia) \n1. L’affidamento e l’esecuzione di lavori, servizi e fornitu-\nre di importo inferiore alle soglie di cui all’articolo 35 av-\nvengono nel rispetto dei principi di cui agli articoli 30, \ncomma 1, 34 e 42, nonché del rispetto del principio di \nrotazione degli inviti e degli affidamenti e in modo da \nassicurare l’effettiva possibilità di partecipazione delle mi-\ncroimprese, piccole e medie imprese.  \n\nNuovo Codice appalti - decreto legislativo 50/2016 \na cura di BibLus-net  -  http://biblus.acca.it \n39 \nLe stazioni appaltanti applicano le disposizioni di cui \nall’articolo 50. \n[il seguente comma è derogabile fino al 30 giugno \n2023] \n2. Fermo restando quanto previsto dagli articoli 37 e 38 e \nsalva la possibilità di ricorrere alle procedure ordinarie, le \nstazioni appaltanti procedono all’affidamento di lavori, \nservizi e forniture di importo inferiore alle soglie di cui \nall’articolo 35, secondo le seguenti modalità:  \na) per affidamenti di importo inferiore a 40.000 euro, \nmediante affidamento diretto, anche senza previa consul-\ntazione di due o più operatori economici o per i lavori in \namministrazione diretta. La pubblicazione dell’avviso sui \nris',
  },
  2: {
    title: 'Competenze legislative di Stato, regioni e province  autonome',
    text: 'Art. 2 \n(Competenze legislative di Stato, regioni e province \nautonome) \n1. Le disposizioni contenute nel presente codice sono \nadottate nell’esercizio della competenza legislativa esclu-\nsiva statale in materia di tutela della concorrenza, ordi-\nnamento civile, nonché nelle altre materie cui è ricondu-\ncibile lo specifico contratto.  \n2. Le Regioni a statuto ordinario esercitano le proprie \nfunzioni nelle materie di competenza regionale ai sensi \ndell’articolo 117 della Costituzione.  \n3. Le Regioni a statuto speciale e le Province autonome \ndi Trento e di Bolzano adeguano la propria legislazione \nsecondo le disposizioni contenute negli statuti e nelle re-\nlative norme di attuazione.  \n Torna su',
  },
  97: {
    title: 'Offerte anormalmente basse',
    text: 'Art. 97 \n(Offerte anormalmente basse) \n1. Gli operatori economici forniscono, su richiesta della \nstazione appaltante, spiegazioni sul prezzo o sui costi \nproposti nelle offerte se queste appaiono anormalmente \nbasse, sulla base di un giudizio tecnico sulla congruità, \nserietà, sostenibilità e realizzabilità dell’offerta.  \n\nNuovo Codice appalti - decreto legislativo 50/2016 \na cura di BibLus-net  -  http://biblus.acca.it \n84 \n2. Quando il criterio di aggiudicazione è quello del prezzo \npiù basso e il numero delle offerte ammesse è pari o su-\nperiore a quindici, la congruità delle offerte è valutata sul-\nle offerte che presentano un ribasso pari o superiore ad \nuna soglia di anomalia determinata; al fine di non rendere \npredeterminabili dagli offerenti i parametri di riferimento \nper il calcolo della soglia di anomalia, il RUP o la com-\nmissione giudicatrice procedono come segue: \na) calcolo della somma e della media aritmetica dei \nribassi percentuali di tutte le offerte ammesse, \ncon esclusione del 10 per cento, arrotondato \nall’unità superiore, rispettivamente delle offerte \ndi maggior ribasso e di quelle di minor ribasso; \nle offerte aventi un uguale valore di ribasso so-\nno pr',
  },
  3: {
    title: 'Definizioni',
    text: 'Art. 3  \n(Definizioni) \n1. Ai fini del presente codice si intende per:  \na) «amministrazioni aggiudicatrici», le amministrazioni \ndello Stato; gli enti pubblici territoriali; gli altri enti pub-\nblici non economici; gli organismi di diritto pubblico; le \nassociazioni, unioni, consorzi, comunque denominati, \ncostituiti da detti soggetti; \nb) «autorità governative centrali», le amministrazioni ag-\ngiudicatrici che figurano nell’allegato III e i soggetti giuri-\ndici loro succeduti;  \nc) «amministrazioni aggiudicatrici sub-centrali», tutte le \namministrazioni aggiudicatrici che non sono autorità go-\nvernative centrali;  \nd) «organismi di diritto pubblico», qualsiasi organismo, \nanche in forma societaria, il cui elenco non tassativo è \ncontenuto nell’allegato IV:  \n1) istituito per soddisfare specificatamente esigenze di \ninteresse generale, aventi carattere non industriale o \ncommerciale;  \n2) dotato di personalità giuridica;  \n3) la cui attività sia finanziata in modo maggioritario dallo \nStato, dagli enti pubblici territoriali o da altri organismi di \ndiritto pubblico oppure la cui gestione sia soggetta al \ncontrollo di questi ultimi oppure il cui organo \nd’amministrazione, di direzi',
  },
  45: {
    title: 'Operatori economici',
    text: 'Art. 45 \n(Operatori economici) \n1. Sono ammessi a partecipare alle procedure di affida-\nmento dei contratti pubblici gli operatori economici di \ncui all’articolo 3, comma 1, lettera p) nonché gli operatori \neconomici stabiliti in altri Stati membri, costituiti con-\nformemente alla legislazione vigente nei rispettivi Paesi. \nGli operatori economici, i raggruppamenti di operatori \neconomici, comprese le associazioni temporanee, che in \nbase alla normativa dello Stato membro nel quale sono \nstabiliti, sono autorizzati a fornire la prestazione oggetto \ndella procedura di affidamento, possono partecipare alle \nprocedure di affidamento dei contratti pubblici anche nel \ncaso in cui essi avrebbero dovuto configurarsi come per-\nsone fisiche o persone giuridiche, ai sensi del presente \ncodice.  \n2. Rientrano nella definizione di operatori economici i \nseguenti soggetti:  \na) gli imprenditori individuali, anche artigiani, e le società, \nanche cooperative;  \nb) i consorzi fra società cooperative di produzione e lavo-\nro costituiti a norma della legge 25 giugno 1909, n. 422, e \ndel decreto legislativo del Capo provvisorio dello Stato \n14 dicembre 1947, n. 1577, e successive modificazioni, e i \n',
  },
  165: {
    title: 'Rischio ed equilibrio economico-finanziario nelle  concessioni',
    text: 'Art. 165 \n(Rischio ed equilibrio economico-finanziario nelle \nconcessioni) \n1. Nei contratti di concessione come definiti all’articolo 3, \ncomma 1, lettere uu) e vv), la maggior parte dei ricavi di \ngestione del concessionario proviene dalla vendita dei \nservizi resi al mercato. Tali contratti comportano il trasfe-\nrimento al concessionario del rischio operativo definito \ndall’articolo 3, comma 1, lettera zz) riferito alla possibilità \nche, in condizioni operative normali, le variazioni relative \nai costi e ai ricavi oggetto della concessione incidano \nsull’equilibrio del piano economico finanziario. Le varia-\nzioni devono essere, in ogni caso, in grado di incidere \nsignificativamente sul valore attuale netto dell’insieme \ndegli investimenti, dei costi e dei ricavi del concessiona-\nrio.  \n2. L’equilibrio economico finanziario definito all’articolo \n3, comma 1, lettera fff), rappresenta il presupposto per la \ncorretta allocazione dei rischi di cui al precedente comma \n1. Ai soli fini del raggiungimento del predetto equilibrio, \nin sede di gara l’amministrazione aggiudicatrice può stabi-\nlire anche un prezzo consistente in un contributo pubbli-\nco ovvero nella cessione di beni immobi',
  },
  1: {
    title: 'Oggetto e ambito di applicazione',
    text: 'Art. 1 \n(Oggetto e ambito di applicazione) \n1. Il presente codice disciplina i contratti di appalto e di \nconcessione delle amministrazioni aggiudicatrici e degli \nenti aggiudicatori aventi ad oggetto l’acquisizione di ser-\nvizi, forniture, lavori e opere, nonché i concorsi pubblici \ndi progettazione.  \n\nNuovo Codice appalti - decreto legislativo 50/2016 \na cura di BibLus-net  -  http://biblus.acca.it \n9 \n2. Le disposizioni del presente codice si applicano, altresì, \nall’aggiudicazione dei seguenti contratti:  \na) appalti di lavori, di importo superiore ad 1 mi-\nlione di euro, sovvenzionati direttamente in mi-\nsura superiore al 50 per cento da amministra-\nzioni aggiudicatrici, nel caso in cui tali appalti \ncomportino una delle seguenti attività:  \n1) \nlavori di genio civile di cui all’ allegato I;  \n2) \nlavori di edilizia relativi a ospedali, impianti \nsportivi, ricreativi e per il tempo libero, \nedifici scolastici e universitari e edifici de-\nstinati a funzioni pubbliche;  \nb) appalti di servizi di importo superiore alle soglie \ndi cui all’articolo 35 sovvenzionati direttamente \nin misura superiore al 50 per cento da ammini-\nstrazioni aggiudicatrici, allorché tali appalti siano \nc',
  },
  63: {
    title:
      'Uso della procedura negoziata senza previa  pubblicazione di un bando di gara',
    text: 'Art. 63 \n(Uso della procedura negoziata senza previa \npubblicazione di un bando di gara) \n1. Nei casi e nelle circostanze indicati nei seguenti com-\nmi, le amministrazioni aggiudicatrici possono aggiudicare \nappalti pubblici mediante una procedura negoziata senza \nprevia pubblicazione di un bando di gara, dando conto \ncon adeguata motivazione, nel primo atto della procedu-\nra, della sussistenza dei relativi presupposti.  \n2. Nel caso di appalti pubblici di lavori, forniture e servi-\nzi, la procedura negoziata senza previa pubblicazione può \nessere utilizzata:  \na) qualora non sia stata presentata alcuna offerta o \nalcuna offerta appropriata, né alcuna domanda \ndi partecipazione o alcuna domanda di parteci-\npazione appropriata, in esito all’esperimento di \nuna procedura aperta o ristretta, purché le con-\ndizioni iniziali dell’appalto non siano sostan-\nzialmente modificate e purché sia trasmessa una \nrelazione alla Commissione europea, su sua ri-\nchiesta. Un’offerta non è ritenuta appropriata se \nnon presenta alcuna pertinenza con l’appalto ed \nè, quindi, manifestamente inadeguata, salvo \nmodifiche sostanziali, a rispondere alle esigenze \ndell’amministrazione aggiudicatrice e ai requ',
  },
  83: {
    title: 'Criteri di selezione e soccorso istruttorio',
    text: 'Art. 83 \n(Criteri di selezione e soccorso istruttorio) \n1. I criteri di selezione riguardano esclusivamente:  \na) i requisiti di idoneità professionale;  \nb) la capacità economica e finanziaria;  \nc) le capacità tecniche e professionali.  \n2. I requisiti e le capacità di cui al comma 1 sono attinenti \ne proporzionati all’oggetto dell’appalto, tenendo presente \nl’interesse pubblico ad avere il più ampio numero di po-\ntenziali partecipanti, nel rispetto dei principi di trasparen-\nza e rotazione. Per i lavori, con il regolamento di cui \nall’articolo 216, comma 27-octies sono disciplinati, nel \nrispetto dei principi di cui al presente articolo e anche al \nfine di favorire l’accesso da parte delle microimprese e \ndelle piccole e medie imprese, il sistema di qualificazione, \ni casi e le modalità di avvalimento, i requisiti e le capacità \nche devono essere posseduti dal concorrente, anche in \nriferimento ai consorzi di cui all’articolo 45, lettere b) e \nc)e la documentazione richiesta ai fini della dimostrazione \n\nNuovo Codice appalti - decreto legislativo 50/2016 \na cura di BibLus-net  -  http://biblus.acca.it \n73 \ndel loro possesso di cui all’allegato XVII. Fino \nall’adozione di detto r',
  },
  208: {
    title: 'Transazione',
    text: 'Art. 208 \n(Transazione) \n1. Le controversie relative a diritti soggettivi derivanti \ndall’esecuzione dei contratti pubblici di lavori, servizi, \nforniture, possono essere risolte mediante transazione nel \nrispetto del codice civile, solo ed esclusivamente \nnell’ipotesi in cui non risulti possibile esperire altri rimedi \nalternativi all’azione giurisdizionale.  \n2. Ove il valore dell’importo oggetto di concessione o \nrinuncia sia superiore a 100.000 euro, ovvero 200.000 eu-\nro in caso di lavori pubblici, è acquisito il parere \ndell’Avvocatura dello Stato, qualora si tratti di ammini-\nstrazioni centrali, ovvero di un legale interno alla struttu-\nra, o del funzionario più elevato in grado competente per \nil contenzioso, ove non esistente il legale interno, qualora \nsi tratti di amministrazioni sub centrali.  \n3. La proposta di transazione può essere formulata sia dal \nsoggetto aggiudicatario che dal dirigente competente, \nsentito il responsabile unico del procedimento.  \n4. La transazione ha forma scritta a pena di nullità.  \n Torna su',
  },
  29: {
    title: 'Principi in materia di trasparenza',
    text: 'Art. 29 \n(Principi in materia di trasparenza) \n1. Tutti gli atti delle amministrazioni aggiudicatrici e degli \nenti aggiudicatori relativi alla programmazione di lavori, \nopere, servizi e forniture, nonché alle procedure per \nl’affidamento e l\'esecuzione di appalti pubblici di servi-\nzi, forniture, lavori e opere, di concorsi pubblici di pro-\ngettazione, di concorsi di idee e di concessioni, compresi \nquelli tra enti nell’ambito del settore pubblico di cui \nall’articolo 5, alla composizione della commissione giudi-\ncatrice e ai curricula dei suoi componenti, ove non consi-\nderati riservati ai sensi dell’articolo 53 ovvero secretati ai \nsensi dell’articolo 162, devono essere pubblicati e aggior-\nnati sul profilo del committente, nella sezione "Ammini-\nstrazione trasparente", con l’applicazione delle disposi-\nzioni di cui al decreto legislativo 14 marzo 2013, n. 33. \nNella stessa sezione sono pubblicati anche i resoconti \ndella gestione finanziaria dei contratti al termine della lo-\nro esecuzione con le modalità previste dal decreto legisla-\ntivo 14 marzo 2013, n. 33. Gli atti di cui al presente \ncomma recano, prima dell’intestazione o in calce, la data \ndi pubblicazione sul profilo ',
  },
  215: {
    title: 'Consiglio superiore dei lavori pubblici',
    text: 'Art. 215 \n(Consiglio superiore dei lavori pubblici) \n1. È garantita la piena autonomia funzionale e organizza-\ntiva, nonché l’indipendenza di giudizio e di valutazione \ndel Consiglio superiore dei lavori pubblici quale massimo \norgano tecnico consultivo dello Stato.  \n2. Con decreto del Presidente della Repubblica, su pro-\nposta del Ministro delle infrastrutture e dei trasporti, pre-\nvia deliberazione del Consiglio dei ministri, possono esse-\nre attribuiti nuovi poteri consultivi su materie identiche o \naffini a quelle già di competenza del Consiglio medesimo. \nCon il medesimo decreto si provvede a disciplinare la \nrappresentanza delle diverse amministrazioni dello Stato \ne delle Regioni nell’ambito del Consiglio superiore dei \nlavori pubblici, nonché a disciplinare la composizione dei \ncomitati tecnici amministrativi, senza nuovi o maggiori \noneri a carico della finanza pubblica. Sono fatte salve le \ncompetenze del Consiglio nazionale per i beni culturali e \nambientali.  \n[i seguente commi 3 e 5 sono derogabili fino al \n30 giugno 2023] \n3. Il Consiglio superiore dei lavori pubblici esprime \nparere obbligatorio sui progetti definitivi di lavori \npubblici di competenza statale, o co',
  },
  105: {
    title: 'Subappalto',
    text: "Art. 105 \n(Subappalto) \n1. I soggetti affidatari dei contratti di cui al presente codi-\nce eseguono in proprio le opere o i lavori, i servizi, le \n\nNuovo Codice appalti - decreto legislativo 50/2016 \na cura di BibLus-net  -  http://biblus.acca.it \n91 \nforniture compresi nel contratto. Il contratto non può \nessere ceduto a pena di nullità, fatto salvo quanto previ-\nsto dall’articolo 106, comma 1, lettera d). è ammesso il \nsubappalto secondo le disposizioni del presente articolo. \nA pena di nullità, fatto salvo quanto previsto dall'ar-\nticolo 106, comma 1, lettera d), il contratto non può \nessere ceduto, non può essere affidata a terzi l'inte-\ngrale esecuzione delle prestazioni o lavorazioni og-\ngetto del contratto di appalto, nonché la prevalente \nesecuzione delle lavorazioni relative al complesso \ndelle categorie prevalenti e dei contratti ad alta in-\ntensità di manodopera. È ammesso il subappalto se-\ncondo le disposizioni del presente articolo. \n2. Il subappalto è il contratto con il quale l’appaltatore \naffida a terzi l’esecuzione di parte delle prestazioni o \nlavorazioni oggetto del contratto di appalto. Costituisce, \ncomunque, subappalto qualsiasi contratto avente ad \noggetto a",
  },
  42: {
    title: 'Conflitto di interesse',
    text: 'Art. 42 \n(Conflitto di interesse) \n1. Le stazioni appaltanti prevedono misure adeguate per \ncontrastare le frodi e la corruzione nonché per individua-\nre, prevenire e risolvere in modo efficace ogni ipotesi di \nconflitto di interesse nello svolgimento delle procedure di \naggiudicazione degli appalti e delle concessioni, in modo \nda evitare qualsiasi distorsione della concorrenza e garan-\ntire la parità di trattamento di tutti gli operatori economi-\nci.  \n2. Si ha conflitto d’interesse quando il personale di una \nstazione appaltante o di un prestatore di servizi che, an-\nche per conto della stazione appaltante, interviene nello \nsvolgimento della procedura di aggiudicazione degli ap-\npalti e delle concessioni o può influenzarne, in qualsiasi \n\nNuovo Codice appalti - decreto legislativo 50/2016 \na cura di BibLus-net  -  http://biblus.acca.it \n44 \nmodo, il risultato, ha, direttamente o indirettamente, un \ninteresse finanziario, economico o altro interesse perso-\nnale che può essere percepito come una minaccia alla sua \nimparzialità e indipendenza nel contesto della procedura \ndi appalto o di concessione. In particolare, costituiscono \nsituazione di conflitto di interesse quelle che de',
  },
  211: {
    title: 'Pareri di precontenzioso dell’ANAC',
    text: 'Art. 211 \n(Pareri di precontenzioso dell’ANAC) \n1. Su iniziativa della stazione appaltante o di una o più \ndelle altre parti, l’ANAC esprime parere, previo contrad-\ndittorio, relativamente a questioni insorte durante lo \nsvolgimento delle procedure di gara, entro trenta giorni \ndalla ricezione della richiesta. Il parere obbliga le parti che \nvi abbiano preventivamente acconsentito ad attenersi a \nquanto in esso stabilito. Il parere vincolante è impugnabi-\nle innanzi ai competenti organi della giustizia amministra-\ntiva ai sensi dell’articolo 120 del codice del processo am-\nministrativo. In caso di rigetto del ricorso contro il parere \nvincolante, il giudice valuta il comportamento della parte \nricorrente ai sensi e per gli effetti dell’articolo 26 del co-\ndice del processo amministrativo.  \n1-bis. L’ANAC è legittimata ad agire in giudizio per \nl’impugnazione dei bandi, degli altri atti generali e dei \nprovvedimenti relativi a contratti di rilevante impatto, \nemessi da qualsiasi stazione appaltante, qualora ritenga \nche essi violino le norme in materia di contratti pubblici \nrelativi a lavori, servizi e forniture.  \n1-ter. L’ANAC, se ritiene che una stazione appaltante \nabbia adotta',
  },
  113: {
    title: 'Incentivi per funzioni tecniche',
    text: 'Art. 113 \n(Incentivi per funzioni tecniche) \n1. Gli oneri inerenti alla progettazione, alla direzione dei \nlavori ovvero al direttore dell’esecuzione, alla vigilanza, ai \ncollaudi tecnici e amministrativi ovvero alle verifiche di \nconformità, al collaudo statico, agli studi e alle ricerche \nconnessi, alla progettazione dei piani di sicurezza e di \ncoordinamento e al coordinamento della sicurezza in fase \ndi esecuzione quando previsti ai sensi del decreto legisla-\ntivo 9 aprile 2008 n. 81, alle prestazioni professionali e \nspecialistiche necessari per la redazione di un progetto \nesecutivo completo in ogni dettaglio fanno carico agli \nstanziamenti previsti per i singoli appalti di lavori, servizi \ne forniture negli stati di previsione della spesa o nei bilan-\nci delle stazioni appaltanti.   \n2. A valere sugli stanziamenti di cui al comma 1, le am-\nministrazioni aggiudicatrici destinano ad un apposito \nfondo risorse finanziarie in misura non superiore al 2 per \ncento modulate sull’importo dei lavori, servizi e forniture, \nposti a base di gara per le funzioni tecniche svolte dai di-\npendenti delle stesse esclusivamente per le attività di pro-\ngrammazione della spesa per investimenti, ',
  },
  168: {
    title: 'Durata delle concessioni',
    text: 'Art. 168 \n(Durata delle concessioni) \n1. La durata delle concessioni è limitata ed è determinata \nnel bando di gara dall’amministrazione aggiudicatrice o \ndall’ente aggiudicatore in funzione dei lavori o servizi ri-\nchiesti al concessionario. La stessa è commisurata al valo-\nre della concessione, nonché alla complessità organizzati-\nva dell’oggetto della stessa.  \n2. Per le concessioni ultraquinquennali, la durata massima \ndella concessione non può essere superiore al periodo di \ntempo necessario al recupero degli investimenti da parte \ndel concessionario individuato sulla base di criteri di ra-\ngionevolezza, insieme ad una remunerazione del capitale \ninvestito, tenuto conto degli investimenti necessari per \nconseguire gli obiettivi contrattuali specifici come risul-\ntante dal piano economico-finanziario. Gli investimenti \npresi in considerazione ai fini del calcolo comprendono \nquelli effettivamente sostenuti dal concessionario, sia \nquelli iniziali sia quelli in corso di concessione.  \n Torna su',
  },
  212: {
    title: 'Indirizzo e coordinamento',
    text: 'Art. 212 \n(Indirizzo e coordinamento) \n1. è istituita presso la Presidenza del Consiglio dei mini-\nstri una Cabina di regia con il compito di:  \na) effettuare una ricognizione sullo stato di attua-\nzione del presente codice e sulle difficoltà ri-\nscontrate dalle stazioni appaltanti nella fase di \napplicazione anche al fine di proporre eventuali \nsoluzioni correttive e di miglioramento;  \nb) curare, se del caso con apposito piano di azione, \nla fase di attuazione del presente codice coordi-\nnando l’adozione, da parte dei soggetti compe-\ntenti, di decreti e linee guida, nonché della loro \nraccolta in testi unici integrati, organici e omo-\ngenei, al fine di assicurarne la tempestività e la \ncoerenza reciproca;  \nc) esaminare le proposte di modifiche normative \nnella materia disciplinata dal presente codice al \nfine di valutarne l’impatto sulla legislazione vi-\ngente, garantire omogeneità e certezza giuridica, \nsupportando la competente struttura della Pre-\nsidenza del Consiglio dei ministri nel coordina-\nmento dei vari interventi regolatori nel settore;  \nd) promuovere la realizzazione, in collaborazione \ncon i soggetti competenti, di un piano nazionale \nin tema di procedure telematic',
  },
};
const ARTS_2023 = {
  119: {
    title: 'Subappalto',
    text: "Art. 119. (Subappalto)\n1. I soggeti affidatari dei contratti eseguono in proprio le opere o i lavori, i servizi, e le forniture compresi nel contratto.\n   Fato salvo quanto previsto dall’articolo 120, comma 1, letera d), la cessione del contratto è nulla. È altresì nullo\n   l'accordo con cui a terzi sia affidata l’integrale esecuzione delle prestazioni o lavorazioni appaltate, nonché la prevalente\n   esecuzione delle lavorazioni relative alla categoria prevalente e dei contratti ad alta intensità di manodopera. È\n   ammesso il subappalto secondo le disposizioni del presente articolo.\n2. Il subappalto è il contratto con il quale l'appaltatore affida a terzi l'esecuzione di parte delle prestazioni o lavorazioni\n   oggeto del contratto di appalto, con organizzazione di mezzi e rischi a carico del subappaltatore. Costituisce, comunque,\n   subappalto di lavori qualsiasi contratto stipulato dall’appaltatore con terzi avente ad oggeto atività ovunque espletate\n   che richiedono l'impiego di manodopera, quali le forniture con posa in opera e i noli a caldo, se singolarmente di importo\n   superiore al 2 per cento dell'importo delle prestazioni affidate o di importo superiore a 100.000 euro ",
  },
  35: {
    title: 'Accesso agli atti e riservatezza',
    text: "Art. 35. (Accesso agli atti e riservatezza)\n1. Le stazioni appaltanti e gli enti concedenti assicurano in modalità digitale l’accesso agli ati delle procedure di affidamento\n    e di esecuzione dei contratti pubblici, mediante acquisizione direta dei dati e delle informazioni inseriti nelle\n    piataforme, ai sensi degli articoli 3-bis e 22 e seguenti della legge 7 agosto 1990, n. 241 e degli articoli 5 e 5-bis del\n    decreto legislativo 14 marzo 2013, n. 33.\n2. Fata salva la disciplina prevista dal codice per i contratti secretati o la cui esecuzione richiede speciali misure di\n   sicurezza, l’esercizio del dirito di accesso è differito:\n   a) nelle procedure aperte, in relazione all'elenco dei soggeti che hanno presentato offerte, fino alla scadenza del\n      termine per la presentazione delle medesime;\n   b) nelle procedure ristrete e negoziate e nelle gare informali, in relazione all'elenco dei soggeti che hanno fato\n      richiesta di invito o che hanno manifestato il loro interesse, e in relazione all'elenco dei soggeti che sono stati invitati\n      a presentare offerte e all'elenco dei soggeti che hanno presentato offerte, fino alla scadenza del termine per la\n      present",
  },
  56: {
    title: 'Appalti esclusi nei settori ordinari',
    text: "Art. 56. (Appalti esclusi nei settori ordinari)\n1. Le disposizioni del codice relative ai setori ordinari non si applicano agli appalti pubblici:\n   a) di servizi aggiudicati da una stazione appaltante a un ente che sia una stazione appaltante o a un'associazione di\n       stazioni appaltanti in base a un dirito esclusivo di cui esse beneficiano in virtù di disposizioni legislative o\n       regolamentari o di disposizioni amministrative pubblicate che siano compatibili con il Tratato sul funzionamento\n       dell'Unione europea;\n   b) finalizzati a permetere alle stazioni appaltanti la messa a disposizione o la gestione di reti di telecomunicazioni o la\n      prestazione al pubblico di uno o più servizi di comunicazioni eletroniche. Ai fini del presente articolo si applicano le\n      definizioni di «rete di comunicazioni» e «servizio di comunicazione eletronica» contenute nell'articolo 2 del codice\n      delle comunicazioni eletroniche, di cui al decreto legislativo 1° agosto 2003, n. 259;\n   c) che le stazioni appaltanti sono tenute ad aggiudicare o ad organizzare nel rispetto di procedure diverse da quelle\n      previste dal codice e stabilite da:\n   1) uno strumento giuridico ch",
  },
  5: {
    title: 'Principi di buona fede e di tutela dell’affidamento',
    text: 'Art. 5. (Principi di buona fede e di tutela dell’affidamento)\n1. Nella procedura di gara le stazioni appaltanti, gli enti concedenti e gli operatori economici si comportano\n   reciprocamente nel rispetto dei principi di buona fede e di tutela dell’affidamento.\n2. Nell’ambito del procedimento di gara, anche prima dell’aggiudicazione, sussiste un affidamento dell’operatore\n   economico sul legitimo esercizio del potere e sulla conformità del comportamento amministrativo al principio di buona\n   fede.\n3. In caso di aggiudicazione annullata su ricorso di terzi o in autotutela, l’affidamento non si considera incolpevole se\n   l’illegitimità è agevolmente rilevabile in base alla diligenza professionale richiesta ai concorrenti. Nei casi in cui non\n   speta l’aggiudicazione, il danno da lesione dell’affidamento è limitato ai pregiudizi economici effetivamente subiti e\n   provati, derivanti dall’interferenza del comportamento scorreto sulle scelte contratuali dell’operatore economico.\n4. Ai fini dell’azione di rivalsa della stazione appaltante o dell’ente concedente condannati al risarcimento del danno a\n   favore del terzo pretermesso, resta ferma la concorrente responsabilità dell’operat',
  },
  21: {
    title: 'Ciclo di vita digitale dei contratti pubblici',
    text: "Art. 21. (Ciclo di vita digitale dei contratti pubblici)\n1. Il ciclo di vita digitale dei contratti pubblici, di norma, si articola in programmazione, progetazione, pubblicazione,\n   affidamento ed esecuzione.\n2. Le atività inerenti al ciclo di vita di cui al comma 1 sono gestite, nel rispetto delle disposizioni del codice\n   dell'amministrazione digitale, di cui al decreto legislativo 7 marzo 2005, n. 82, atraverso piataforme e servizi digitali\n   fra loro interoperabili, come indicati all’articolo 22.\n3. I soggeti che intervengono nel ciclo di vita digitale dei contratti pubblici operano secondo le disposizioni della presente\n   Parte e procedono all’ato dell’avvio della procedura secondo le disposizioni del codice di cui al decreto legislativo n. 82\n   del 2005 e dell’articolo 3 della legge 13 agosto 2010, n. 136.",
  },
  94: {
    title: 'Cause di esclusione automatica',
    text: "Art. 94. (Cause di esclusione automatica)\n1. È causa di esclusione di un operatore economico dalla partecipazione a una procedura d'appalto la condanna con\n    sentenza definitiva o decreto penale di condanna divenuto irrevocabile per uno dei seguenti reati:\n   a) deliti, consumati o tentati, di cui agli articoli 416, 416-bis del codice penale oppure deliti commessi avvalendosi\n      delle condizioni previste dal predeto articolo 416-bis oppure al fine di agevolare l'atività delle associazioni previste\n      dallo stesso articolo, nonché per i deliti, consumati o tentati, previsti dall'articolo 74 del testo unico delle leggi in\n      materia di disciplina degli stupefacenti e sostanze psicotrope, prevenzione, cura e riabilitazione dei relativi stati di\n      tossicodipendenza, di cui al decreto del Presidente della Repubblica 9 otobre 1990, n. 309, dall'articolo 291-quater\n      del testo unico delle disposizioni legislative in materia doganale, di cui al decreto del Presidente della Repubblica 23\n      gennaio 1973, n. 43 e dall'articolo 452-quaterdieces del codice penale, in quanto riconducibili alla partecipazione a\n      un'organizzazione criminale, quale definita all'articolo ",
  },
  9: {
    title: 'Principio di conservazione dell’equilibrio contrattuale',
    text: 'Art. 9. (Principio di conservazione dell’equilibrio contrattuale)\n1. Se sopravvengono circostanze straordinarie e imprevedibili, estranee alla normale alea, all’ordinaria flutuazione\n   economica e al rischio di mercato e tali da alterare in maniera rilevante l’equilibrio originario del contratto, la parte\n   svantaggiata, che non abbia volontariamente assunto il relativo rischio, ha dirito alla rinegoziazione secondo buona\n   fede delle condizioni contratuali. Gli oneri per la rinegoziazione sono riconosciuti all’esecutore a valere sulle somme a\n   disposizione indicate nel quadro economico dell’intervento, alle voci imprevisti e accantonamenti e, se necessario,\n   anche utilizzando le economie da ribasso d’asta.\n2. Nell’ambito delle risorse individuate al comma 1, la rinegoziazione si limita al ripristino dell’originario equilibrio del\n   contratto oggeto dell’affidamento, quale risultante dal bando e dal provvedimento di aggiudicazione, senza alterarne\n   la sostanza economica.\n3. Se le circostanze sopravvenute di cui al comma 1 rendono la prestazione, in parte o temporaneamente, inutile o\n   inutilizzabile per uno dei contraenti, questi ha dirito a una riduzione proporzionale d',
  },
  11: {
    title:
      'Principio di applicazione dei contratti collettivi nazionali di settore. Inademp',
    text: "Art. 11. (Principio di applicazione dei contratti collettivi nazionali di settore. Inadempienze contributive e ritardo nei\n        pagamenti)\n1. Al personale impiegato nei lavori, servizi e forniture oggeto di appalti pubblici e concessioni è applicato il contratto\n   colletivo nazionale e territoriale in vigore per il settore e per la zona nella quale si eseguono le prestazioni di lavoro,\n   stipulato dalle associazioni dei datori e dei prestatori di lavoro comparativamente più rappresentative sul piano\n   nazionale e quello il cui ambito di applicazione sia stretamente connesso con l’atività oggeto dell’appalto o della\n   concessione svolta dall’impresa anche in maniera prevalente.\n2. Nei bandi e negli inviti le stazioni appaltanti e gli enti concedenti indicano il contratto colletivo applicabile al personale\n   dipendente impiegato nell'appalto o nella concessione, in conformità al comma 1.\n3. Gli operatori economici possono indicare nella propria offerta il differente contratto colletivo da essi applicato, purché\n   garantisca ai dipendenti le stesse tutele di quello indicato dalla stazione appaltante o dall’ente concedente.\n4. Nei casi di cui al comma 3, prima di procedere all",
  },
  25: {
    title: 'Piattaforme di approvvigionamento digitale',
    text: "Art. 25. (Piattaforme di approvvigionamento digitale)\n1. Le piataforme di approvvigionamento digitale sono costituite dall’insieme dei servizi e dei sistemi informatici,\n   interconnessi e interoperanti, utilizzati dalle stazioni appaltanti e dagli enti concedenti per svolgere una o più atività\n   di cui all’articolo 21, comma 1, e per assicurare la piena digitalizzazione dell’intero ciclo di vita dei contratti pubblici. A\n   tal fine, le piataforme di approvvigionamento digitale interagiscono con i servizi della Banca dati nazionale dei contratti\n   pubblici di cui all’articolo 23 nonché con i servizi della piataforma digitale nazionale dati di cui all’articolo 50-ter del\n   codice dell'amministrazione digitale, di cui al decreto legislativo 7 marzo 2005, n. 82.\n2. Le stazioni appaltanti e gli enti concedenti utilizzano le piataforme di approvvigionamento digitale per svolgere le\n   procedure di affidamento e di esecuzione dei contratti pubblici, secondo le regole tecniche di cui all’articolo 26. Le\n   piataforme di approvvigionamento digitale non possono alterare la parità di accesso degli operatori, né impedire o\n   limitare la partecipazione alla procedura di gara degli stessi ",
  },
  116: {
    title: 'Collaudo e verifica di conformità',
    text: "Art. 116. (Collaudo e verifica di conformità)\n1. I contratti sono soggeti a collaudo per i lavori e a verifica di conformità per i servizi e per le forniture per certificare il\n   rispetto delle carateristiche tecniche, economiche e qualitative dei lavori e delle prestazioni, nonché degli obietivi e\n   dei tempi, in conformità delle previsioni e patuizioni contratuali.\n2. Il collaudo finale o la verifica di conformità deve essere completato non oltre sei mesi dall'ultimazione dei lavori o delle\n   prestazioni, salvi i casi, individuati dall’allegato II.14, di particolare complessità, per i quali il termine può essere elevato\n   sino ad un anno. Nella letera d’incarico, in presenza di opere o servizi di limitata complessità, i tempi possono essere\n   ridoti. Il certificato di collaudo ha caratere provvisorio e assume caratere definitivo dopo due anni dalla sua emissione.\n   Decorso tale termine, il collaudo si intende tacitamente approvato ancorché l'ato formale di approvazione non sia stato\n   emesso entro due mesi dalla scadenza del medesimo termine.\n3. Salvo quanto disposto dall'articolo 1669 del codice civile, l'appaltatore risponde per la difformità e i vizi dell'opera,\n   anco",
  },
  54: {
    title: 'Esclusione automatica delle offerte anomale',
    text: "Art. 54. (Esclusione automatica delle offerte anomale)\n1. Nel caso di aggiudicazione, con il criterio del prezzo più basso, di contratti di appalto di lavori o servizi di importo\n   inferiore alle soglie di rilevanza europea che non presentano un interesse transfrontaliero certo, le stazioni appaltanti,\n   in deroga a quanto previsto dall’articolo 110, prevedono negli ati di gara l'esclusione automatica delle offerte che\n   risultano anomale, qualora il numero delle offerte ammesse sia pari o superiore a cinque. Il primo periodo non si applica\n   agli affidamenti di cui all’articolo 50, comma 1, letere a) e b). In ogni caso le stazioni appaltanti possono valutare la\n   congruità di ogni altra offerta che, in base ad elementi specifici, appaia anormalmente bassa.\n2. Nei casi di cui al comma 1, primo periodo, le stazioni appaltanti indicano negli ati di gara il metodo per l’individuazione\n   delle offerte anomale, scelto fra quelli descriti nell’allegato II.2, ovvero lo selezionano in sede di valutazione delle\n   offerte tramite sorteggio tra i metodi compatibili dell’allegato II.2.\n3. In sede di prima applicazione del codice, l’allegato II.2 è abrogato a decorrere dalla data di entr",
  },
  23: {
    title: 'Banca dati nazionale dei contratti pubblici',
    text: "Art. 23. (Banca dati nazionale dei contratti pubblici)\n1. L’ANAC è titolare in via esclusiva della Banca dati nazionale dei contratti pubblici di cui all’articolo 62-bis del codice\n    dell'amministrazione digitale, di cui al decreto legislativo 7 marzo 2005, n. 82, abilitante l’ecosistema nazionale di e-\n    procurement, e ne sviluppa e gestisce i servizi.\n2. L’ANAC individua con propri provvedimenti le sezioni in cui si articola la banca dati di cui al comma 1 e i servizi ad essa\n    collegati.\n3. La Banca dati nazionale dei contratti pubblici è interoperabile con le piataforme di approvvigionamento digitale utilizzate\n    dalle stazioni appaltanti e dagli enti concedenti e con il portale dei soggeti aggregatori di cui al decreto-legge 24 aprile\n    2014, n. 66, convertito, con modificazioni, dalla legge 23 giugno 2014, n. 89, per la digitalizzazione di tute le fasi del\n    ciclo di vita dei contratti pubblici, nonché con la piataforma digitale nazionale dati di cui all’articolo 50-ter del codice di\n    cui al decreto legislativo n. 82 del 2005, con le basi di dati di interesse nazionale di cui all’articolo 60 del codice di cui al\n    decreto legislativo 7 marzo 2005, n. 82 e con",
  },
  104: {
    title: 'Avvalimento',
    text: 'Art. 104. (Avvalimento)\n1. L’avvalimento è il contratto con il quale una o più imprese ausiliarie si obbligano a metere a disposizione di un operatore\n   economico che concorre in una procedura di gara dotazioni tecniche e risorse umane e strumentali per tuta la durata\n   dell’appalto. Il contratto di avvalimento è concluso in forma scrita a pena di nullità con indicazione specifica delle risorse\n   messe a disposizione dell’operatore economico. Il contratto di avvalimento è normalmente oneroso, salvo che risponda\n   anche a un interesse dell’impresa ausiliaria, e può essere concluso a prescindere dalla natura giuridica dei legami tra le\n   parti.\n2. Qualora il contratto di avvalimento sia concluso per acquisire un requisito necessario alla partecipazione a una\n   procedura di aggiudicazione di un appalto di lavori di importo pari o superiore a euro 150.000, o di un appalto di servizi\n   e forniture, esso ha per oggeto le dotazioni tecniche e le risorse che avrebbero consentito\n   all’operatore economico di otenere l’atestazione di qualificazione richiesta.\n3. Qualora il contratto di avvalimento sia stipulato con impresa ausiliaria in possesso di autorizzazione o altro titolo\n   ab',
  },
  213: {
    title: 'Arbitrato',
    text: "Art. 213. (Arbitrato)\n1. Le controversie su diriti soggetivi, derivanti dall'esecuzione dei contratti relativi a lavori, servizi, forniture, concorsi di\n   progetazione e di idee, comprese quelle conseguenti al mancato raggiungimento dell'accordo bonario di cui agli articoli\n   210 e 211, possono essere deferite ad arbitri. L'arbitrato si applica anche alle controversie relative a contratti in cui sia\n   parte una società a partecipazione pubblica oppure una società controllata o collegata a una società a partecipazione\n   pubblica, ai sensi dell'articolo 2359 del codice civile, o che comunque abbiano a oggeto opere o forniture finanziate\n   con risorse a carico dei bilanci pubblici.\n2. La stazione appaltante o l’ente concedente può diretamente indicare nel bando o nell'avviso con cui indice la gara\n   oppure, per le procedure senza bando, nell'invito, se il contratto conterrà o meno la clausola compromissoria. In questi\n   casi, l’aggiudicatario può rifiutare la clausola compromissoria entro 20 venti giorni dalla conoscenza dell'aggiudicazione.\n   In tal caso la clausola compromissoria non è inserita nel contratto. È nella facoltà delle parti di comprometere la lite in\n   arbitrat",
  },
  195: {
    title: 'Obbligazioni delle società di scopo',
    text: 'Art. 195. (Obbligazioni delle società di scopo)\n1. Le società di scopo possono emetere obbligazioni e titoli di debito, anche in deroga ai limiti di cui agli articoli 2412 e\n   2483 del codice civile, purché destinati alla sotoscrizione da parte degli investitori istituzionali e dei clienti professionali\n   indicati nell’articolo 6, commi 2-quinquies e 2-sexies, del testo unico delle disposizioni in materia di intermediazione\n   finanziaria, di cui al decreto legislativo 24 febbraio 1998, n. 58, e nei regolamenti atuativi o delle loro controllanti e\n   controllate ai sensi dell’articolo 1, commi 6-bis.1 e 6-bis.2 dello stesso testo unico di cui al decreto legislativo n. 58 del\n   1998. Le obbligazioni e i titoli di debito di cui al primo periodo possono essere dematerializzati e non possono essere\n   trasferiti a soggeti che non siano investitori istituzionali o clienti professionali. In relazione ai titoli emessi ai sensi del\n   presente articolo non si applicano gli articoli 2413, 2414-bis, commi primo e secondo, e da 2415 a 2420 del codice civile.\n2. L’emissione di obbligazioni è ammessa esclusivamente per finanziare ovvero rifinanziare il debito precedentemente\n   contratto per',
  },
  65: {
    title: 'Operatori economici',
    text: "Art. 65. (Operatori economici)\n1. Sono ammessi a partecipare alle procedure di affidamento dei contratti pubblici gli operatori economici di cui all’articolo\n   1, letera l), dell’allegato I.1, nonché gli operatori economici stabiliti in altri Stati membri, costituiti conformemente alla\n   legislazione vigente nei rispetivi Paesi.\n2. Rientrano nella definizione di operatori economici:\n   a) gli imprenditori individuali, anche artigiani, e le società, anche cooperative;\n   b) i consorzi fra società cooperative di produzione e lavoro costituiti a norma della legge 25 giugno 1909, n. 422 e del\n      decreto legislativo del Capo provvisorio dello Stato 14 dicembre 1947, n. 1577;\n   c) i consorzi tra imprese artigiane di cui alla legge 8 agosto 1985, n. 443;\n   d) i consorzi stabili, costituiti anche in forma di società consortili ai sensi dell'articolo 2615-ter del codice civile, tra\n      imprenditori individuali, anche artigiani, società commerciali, società cooperative di produzione e lavoro; i consorzi\n      stabili sono formati da non meno di tre consorziati che, con decisione assunta dai rispetivi organi deliberativi,\n       abbiano stabilito di operare in modo congiunto nel sett",
  },
  57: {
    title:
      'Clausole sociali del bando di gara e degli avvisi e criteri di sostenibilità ene',
    text: "Art. 57. (Clausole sociali del bando di gara e degli avvisi e criteri di sostenibilità energetica e ambientale)\n1. Per gli affidamenti dei contratti di appalto di lavori e servizi diversi da quelli aventi natura intelletuale e per i contratti\n   di concessione i bandi di gara, gli avvisi e gli inviti, tenuto conto della tipologia di intervento, in particolare ove riguardi\n   il settore dei beni culturali e del paesaggio, e nel rispetto dei principi dell’Unione europea, devono contenere specifiche\n   clausole sociali con le quali sono richieste, come requisiti necessari dell'offerta, misure orientate tra l'altro a garantire\n   le pari opportunità generazionali, di genere e di inclusione lavorativa per le persone con disabilità o svantaggiate, la\n   stabilità occupazionale del personale impiegato, nonché l'applicazione dei contratti colletivi nazionali e territoriali di\n   settore, tenendo conto, in relazione all'oggeto dell'appalto o della concessione e alle prestazioni da eseguire anche in\n   maniera prevalente, di quelli stipulati dalle associazioni dei datori e dei prestatori di lavoro comparativamente più\n   rappresentative sul piano nazionale e di quelli il cui ambito di applic",
  },
  58: {
    title: 'Suddivisione in lotti',
    text: "Art. 58. (Suddivisione in lotti)\n1. Per garantire la effetiva partecipazione delle micro, delle piccole e delle medie imprese, anche di prossimità, gli appalti\n   sono suddivisi in loti funzionali, prestazionali o quantitativi in conformità alle categorie o specializzazioni nel settore\n   dei lavori, servizi e forniture.\n2. Nel bando o nell’avviso di indizione della gara le stazioni appaltanti motivano la mancata suddivisione dell'appalto in\n   loti tenendo conto dei princìpi europei sulla promozione di condizioni di concorrenza paritarie per le piccole e medie\n   imprese. Nel caso di suddivisione in loti, il relativo valore deve essere adeguato in modo da garantire l’effetiva\n   possibilità di partecipazione da parte delle microimprese, piccole e medie imprese.\n3. Nel medesimo ato le stazioni appaltanti indicano i criteri di natura qualitativa o quantitativa concretamente seguiti\n   nella suddivisione in loti, avuto riguardo ai parametri indicati al comma 2. È in ogni caso vietato l’artificioso\n   accorpamento dei loti.\n4. La stazione appaltante può limitare il numero massimo di loti per i quali è consentita l’aggiudicazione al medesimo\n   concorrente per ragioni connesse alle car",
  },
  68: {
    title:
      'Raggruppamenti temporanei e consorzi ordinari di operatori economici',
    text: "Art. 68. (Raggruppamenti temporanei e consorzi ordinari di operatori economici)\n1. È consentita la presentazione di offerte da parte dei soggeti di cui all'articolo 65, comma 2, letera e) e letera f), anche\n   se non ancora costituiti. In tal caso l'offerta deve essere sotoscrita da tuti gli operatori economici che costituiranno i\n   raggruppamenti temporanei o i consorzi ordinari di concorrenti e deve contenere l'impegno che, in caso di\n   aggiudicazione della gara, gli stessi operatori conferiranno mandato colletivo speciale con rappresentanza ad uno di\n   essi, da indicare in sede di offerta e qualificato come mandatario, il quale stipulerà il contratto in nome e per conto\n   proprio e dei mandanti.\n2. Fato salvo quanto previsto dal comma 4, in sede di offerta sono specificate le categorie di lavori o le parti del servizio\n   o della fornitura che saranno eseguite dai singoli operatori economici riuniti o consorziati, con l’impegno di questi a\n   realizzarle.\n3. I raggruppamenti temporanei non possono essere obbligati ad avere una forma giuridica specifica ai fini della\n   presentazione di un'offerta o di una domanda di partecipazione.\n4. Le stazioni appaltanti possono:\n   a) im",
  },
  44: {
    title: 'Appalto integrato',
    text: "Art. 44. (Appalto integrato)\n1. Negli appalti di lavori, con la decisione di contrarre, la stazione appaltante o l’ente concedente, se qualificati, può\n   stabilire che il contratto abbia per oggeto la progetazione esecutiva e l’esecuzione dei lavori sulla base di un progeto\n   di fatibilità tecnico-economica approvato. Tale facoltà non può essere esercitata per gli appalti di opere di\n   manutenzione ordinaria.\n2. La stazione appaltante o l’ente concedente motiva la scelta di cui al comma 1 con riferimento alle esigenze tecniche,\n\n3\n    La norma pare derogare alle tempistiche di introduzione del B.I.M. previste dall'articolo 6 del d.m. n. 560 del 2017\n    come modificato dal d.m. n. 312 del 2021.\n   tenendo sempre conto del rischio di eventuali scostamenti di costo nella fase esecutiva rispetto a quanto\n   contratualmente previsto.\n3. Quando il contratto è affidato ai sensi del comma 1, gli operatori economici devono possedere i requisiti prescriti per i\n   progetisti, oppure avvalersi di progetisti qualificati, da indicare nell’offerta, o partecipare in raggruppamento con\n   soggeti qualificati per la progetazione. La qualificazione per la progetazione comprende anche l’uso di me",
  },
  95: {
    title: 'Cause di esclusione non automatica',
    text: "Art. 95. (Cause di esclusione non automatica)\n1. La stazione appaltante esclude dalla partecipazione alla procedura un operatore economico qualora accerti:\n   a) sussistere gravi infrazioni, debitamente accertate con qualunque mezzo adeguato, alle norme in materia di salute e\n       di sicurezza sul lavoro nonché agli obblighi in materia ambientale, sociale e del lavoro stabiliti dalla normativa\n       europea e nazionale, dai contratti colletivi o dalle disposizioni internazionali elencate nell’allegato X alla diretiva\n       2014/24/UE del Parlamento europeo e del Consiglio del 26 febbraio 2014;\n   b) che la partecipazione dell'operatore economico determini una situazione di conflito di interesse di cui all’articolo\n      16 non diversamente risolvibile;\n   c) sussistere una distorsione della concorrenza derivante dal precedente coinvolgimento degli operatori economici\n      nella preparazione della procedura d'appalto che non possa essere risolta con misure meno intrusive;\n   d) sussistere rilevanti indizi tali da far ritenere che le offerte degli operatori economici siano imputabili ad un unico\n      centro decisionale a cagione di accordi intercorsi con altri operatori economi",
  },
  216: {
    title: 'Pareri obbligatori',
    text: "Art. 216. (Pareri obbligatori)\n1. L’acquisizione del parere del collegio consultivo tecnico è obbligatoria nei casi di sospensione, volontaria o coativa,\n   dell'esecuzione di lavori direti alla realizzazione delle opere pubbliche di importo pari o superiore alle soglie di rilevanza\n   europea di cui all'articolo 14, nonché nei casi dei contratti relativi a servizi e forniture di cui all’articolo 121, comma 11,\n   secondo periodo.\n2. Se, per qualsiasi motivo, i lavori non possono procedere con il soggeto designato, prima di risolvere il contratto la\n   stazione appaltante acquisisce il parere del collegio consultivo tecnico, anche in ordine alla possibilità che gravi motivi\n   tecnici ed economici rendano preferibile la prosecuzione con il medesimo soggeto.\n3. Nel parere il collegio consultivo tecnico valuta anche la possibilità di decidere:\n   a) se procedere all'esecuzione in via direta dei lavori, anche avvalendosi, nei casi consentiti dalla legge, previa\n      convenzione, di altri enti o società pubbliche nell'ambito del quadro economico dell'opera;\n   b) se interpellare progressivamente i soggeti che hanno partecipato alla originaria procedura di gara come risultanti\n      da",
  },
  34: {
    title: 'Cataloghi elettronici',
    text: "Art. 34. (Cataloghi elettronici)\n1. Le stazioni appaltanti e gli enti concedenti possono chiedere che le offerte siano presentate soto forma di catalogo\n   eletronico o che includano un catalogo eletronico. Le offerte presentate soto forma di catalogo eletronico possono\n   essere corredate di altri documenti, a completamento dell'offerta.\n2. I cataloghi eletronici sono predisposti dai candidati o dagli offerenti per la partecipazione a una determinata procedura\n   di appalto in conformità alle specifiche tecniche e al formato stabiliti dalle stazioni appaltanti.\n3. Quando la presentazione delle offerte soto forma di cataloghi eletronici è accetata o richiesta, le stazioni appaltanti\n   e gli enti concedenti:\n   a) nei setori ordinari, lo indicano nel bando di gara o nell'invito a confermare interesse, quando il mezzo di indizione\n      di gara è un avviso di pre-informazione; nei setori speciali, lo indicano nel bando di gara, nell'invito a confermare\n      interesse, o, quando il mezzo di indizione di gara è un avviso sull'esistenza di un sistema di qualificazione, nell'invito\n      a presentare offerte o a negoziare;\n   b) indicano nei documenti di gara tute le informazioni relat",
  },
  59: {
    title: 'Accordi quadro',
    text: "Art. 59. (Accordi quadro)\n1. Le stazioni appaltanti possono concludere accordi quadro di durata non superiore a quatro anni, salvo casi eccezionali\n   debitamente motivati, in particolare con riferimento all’oggeto dell’accordo quadro. L’accordo quadro indica il valore\n   stimato dell’intera operazione contratuale. In ogni caso la stazione appaltante non può ricorrere agli accordi quadro in\n   modo da eludere l'applicazione del codice o in modo da ostacolare, limitare o distorcere la concorrenza. In particolare,\n   e salvo quanto previsto dai commi 4, letera b), e 5 ai fini dell’otenimento di offerte migliorative, il ricorso all’accordo\n   quadro non è ammissibile ove l’appalto consequenziale comporti modifiche sostanziali alla tipologia delle prestazioni\n   previste nell'accordo.\n2. Gli appalti basati su un accordo quadro sono aggiudicati secondo le procedure previste dal presente articolo, applicabili\n   tra le stazioni appaltanti, individuate nell'indizione della procedura per la conclusione dell’accordo quadro, e gli\n   operatori economici selezionati in esito alla stessa. Non possono in sede di appalto apportarsi modifiche sostanziali alle\n   condizioni fissate nell'accordo qu",
  },
  178: {
    title: 'Durata della concessione',
    text: 'Art. 178. (Durata della concessione)\n1. La durata delle concessioni è limitata ed è determinata dall’ente concedente in funzione dei lavori o servizi richiesti al\n   concessionario.\n2. Per le concessioni ultraquinquennali, la durata massima della concessione non supera il periodo di tempo in cui si può\n   ragionevolmente prevedere che il concessionario recuperi gli investimenti effetuati nell’esecuzione dei lavori o dei\n   servizi, insieme con un ritorno sul capitale investito, tenuto conto degli investimenti necessari per conseguire gli obietivi\n   contratuali specifici assunti dal concessionario per rispondere alle esigenze riguardanti, ad esempio, la qualità o il\n   prezzo per gli utenti ovvero il perseguimento di elevati standard di sostenibilità ambientale.\n3. Gli investimenti presi in considerazione ai fini del calcolo comprendono sia quelli iniziali sia quelli in corso di concessione.\n4. La durata massima della concessione deve essere indicata nei documenti di gara, a meno che essa non sia utilizzata\n   come criterio di aggiudicazione del contratto.\n5. La durata dei contratti di concessione non è prorogabile, salvo per la revisione di cui all’articolo 192, comma 1. I contrat',
  },
  18: {
    title: 'Il contratto e la sua stipulazione',
    text: "Art. 18. (Il contratto e la sua stipulazione)\n1. Il contratto è stipulato, a pena di nullità, in forma scrita ai sensi dell’allegato I.1, articolo 3, comma 1, letera b), in\n   modalità eletronica nel rispetto delle pertinenti disposizioni del codice dell'amministrazione digitale, di cui al decreto\n   legislativo 7 marzo 2005, n. 82, in forma pubblica amministrativa a cura dell’ufficiale rogante della stazione appaltante,\n   con ato pubblico notarile informatico oppure mediante scritura privata. In caso di procedura negoziata oppure per gli\n   affidamenti direti, mediante corrispondenza secondo l'uso commerciale, consistente in un apposito scambio di letere,\n   anche tramite posta eletronica certificata o sistemi eletronici di recapito certificato qualificato ai sensi del regolamento\n   UE n. 910/2014 del Parlamento europeo e del Consiglio del 23 luglio 2014. I capitolati e il computo metrico estimativo,\n   richiamati nel bando o nell'invito, fanno parte integrante del contratto.\n2. Divenuta efficace l’aggiudicazione ai sensi dell’articolo 17, comma 5 e fato salvo l’esercizio dei poteri di autotutela, la\n   stipula del contratto ha luogo entro i successivi sessanta giorni anche in p",
  },
  27: {
    title: 'Pubblicità legale degli atti',
    text: 'Art. 27. (Pubblicità legale degli atti)\n1. La pubblicità degli ati è garantita dalla Banca dati nazionale dei contratti pubblici, mediante la trasmissione dei dati\n   all’Ufficio delle pubblicazioni dell’Unione europea e la loro pubblicazione ai sensi degli articoli 84 e 85, secondo quanto\n   definito dal provvedimento di cui al comma 4 del presente articolo.\n2. Gli effeti giuridici degli ati oggeto di pubblicazione ai sensi del comma 1 decorrono dalla data di pubblicazione nella\n   Banca dati nazionale dei contratti pubblici.\n3. La documentazione di gara è resa costantemente disponibile atraverso le piataforme digitali di cui all’articolo 25 e\n   atraverso i siti istituzionali delle stazioni appaltanti e degli enti concedenti. Essa è costantemente accessibile atraverso\n   il collegamento con la Banca dati nazionale dei contratti pubblici.\n4. L’ANAC, con proprio provvedimento da adotare entro sessanta giorni dalla data di entrata in vigore del codice, d’intesa\n   con il Ministero delle infrastruture e dei trasporti, stabilisce i tempi e le modalità di attuazione del presente articolo.\n   Fino alla data di entrata in vigore del provvedimento di cui al primo periodo la pubblicità leg',
  },
  48: {
    title:
      'Disciplina comune applicabile ai contratti di lavori, servizi e forniture di imp',
    text: 'Art. 48. (Disciplina comune applicabile ai contratti di lavori, servizi e forniture di importo inferiore alle soglie di rilevanza\n          europea)\n1. L’affidamento e l’esecuzione dei contratti aventi per oggeto lavori, servizi e forniture di importo inferiore alle soglie di\n   rilevanza europea si svolgono nel rispetto dei principi di cui al Libro I, Parti I e II.\n2. Quando per uno dei contratti di cui al comma 1 la stazione appaltante accerta l’esistenza di un interesse transfrontaliero\n    certo, segue le procedure ordinarie di cui alle Parti seguenti del presente Libro.\n3. Restano fermi gli obblighi di utilizzo degli strumenti di acquisto e di negoziazione previsti dalle vigenti disposizioni in\n   materia di contenimento della spesa.\n4. Ai contratti di importo inferiore alle soglie di rilevanza europea si applicano, se non derogate dalla presente Parte, le\n   disposizioni del codice.\nArt 49. (Principio di rotazione degli affidamenti)\n1. Gli affidamenti di cui alla presente Parte avvengono nel rispetto del principio di rotazione.\n2. In applicazione del principio di rotazione è vietato l’affidamento o l’aggiudicazione di un appalto al contraente uscente\n   nei casi in cui due co',
  },
  72: {
    title: 'Procedura ristretta',
    text: "Art. 72. (Procedura ristretta)\n1. Nelle procedure ristrete qualsiasi operatore economico può presentare una domanda di partecipazione in risposta a\n   un avviso di indizione di gara contenente i dati di cui all'allegato II.6, Parte I, letera B o C a seconda del caso, fornendo\n    le informazioni richieste dalla stazione appaltante.\n2. Il termine minimo per la ricezione delle domande di partecipazione è di trenta giorni dalla data di trasmissione del\n   bando di gara ai sensi dell’articolo 84 o, se è utilizzato l’avviso di pre-informazione come mezzo di indizione di una gara,\n   dalla data d'invio dell'invito a confermare il proprio interesse.\n3. A seguito della valutazione da parte delle stazioni appaltanti delle informazioni fornite, soltanto gli operatori economici\n   invitati possono presentare un'offerta. Il termine minimo per la ricezione delle offerte è di 30 trenta giorni dalla data\n   dell’invito a presentare offerte.\n4. Se le stazioni appaltanti hanno pubblicato l’avviso di pre-informazione non utilizzato per l'indizione di una gara, il\n   termine minimo per la presentazione delle offerte può essere ridoto a 10 dieci giorni purché concorrano le seguenti\n   circostanze:\n   ",
  },
  194: {
    title: 'Società di scopo',
    text: "Art. 194. (Società di scopo)\n1. Per gli affidamenti superiori alla soglia di cui all’articolo 14, comma 1, letera a), il bando di gara per l’affidamento di una\n   concessione nella forma della finanza di progeto prevede che l’aggiudicatario costituisca una società di scopo in forma\n   di società per azioni o a responsabilità limitata, anche consortile. Il bando di gara indica l'ammontare minimo del capitale\n   sociale della società. In caso di concorrente costituito da più soggeti, nell'offerta è indicata, a pena di esclusione, la\n   quota di partecipazione al capitale sociale di ciascun soggeto.\n2. I lavori da eseguire e i servizi da prestare da parte delle società di scopo si intendono realizzati e prestati in proprio\n   anche nel caso in cui siano affidati diretamente dalle suddete società ai propri soci, originari o subentrati, sempre che\n   essi siano in possesso dei requisiti stabiliti dalle vigenti norme legislative e regolamentari.\n3. La società di scopo, senza che ciò costituisca cessione di contratto, subentra nel rapporto di concessione senza necessità\n   di approvazione o autorizzazione amministrativa. Essa sostituisce l’aggiudicatario in tuti i rapporti con l'ente\n   c",
  },
  80: {
    title: 'Etichettature',
    text: 'Art. 80. (Etichettature)\n1. Le etichetature sono definite e disciplinate dall’allegato II.5.',
  },
  218: {
    title: 'Costituzione facoltativa del collegio consultivo tecnico',
    text: "Art. 218. (Costituzione facoltativa del collegio consultivo tecnico)\n1. Le stazioni appaltanti e gli enti concedenti, tramite il RUP, possono costituire, secondo le modalità di cui all’allegato V.2,\n   un collegio consultivo tecnico, formato da tre componenti, per risolvere problemi tecnici o giuridici di ogni natura\n   suscetibili di insorgere anche nella fase antecedente alla esecuzione del contratto, ivi comprese le determinazioni delle\n   carateristiche delle opere e le altre clausole e condizioni del bando o dell'invito, nonché la verifica del possesso dei\n   requisiti di partecipazione e dei criteri di selezione e di aggiudicazione.",
  },
  55: {
    title: 'Termini dilatori',
    text: 'Art. 55. (Termini dilatori)\n1. La stipulazione del contratto avviene entro trenta giorni dall’aggiudicazione.\n2. I termini dilatori previsti dall’articolo 18, commi 3 e 4, non si applicano agli affidamenti dei contratti di importo inferiore\n     alle soglie di rilevanza europea.\n\nPARTE II - DEGLI ISTITUTI E DELLE CLAUSOLE COMUNI',
  },
  41: {
    title: 'Livelli e contenuti della progettazione',
    text: 'Art. 41. (Livelli e contenuti della progettazione)\n1. La progetazione in materia di lavori pubblici, si articola in due livelli di successivi approfondimenti tecnici: il progeto di\n   fatibilità tecnico-economica e il progeto esecutivo. Essa è volta ad assicurare:\n    a) il soddisfacimento dei fabbisogni della colletività;\n    b) la conformità alle norme ambientali, urbanistiche e di tutela dei beni culturali e paesaggistici, nonché il rispetto di\n       quanto previsto dalla normativa in materia di tutela della salute e della sicurezza delle costruzioni;\n    c) la rispondenza ai requisiti di qualità architetonica e tecnico-funzionale, nonché il rispetto dei tempi e dei costi\n       previsti;\n    d) il rispetto di tuti i vincoli esistenti, con particolare riguardo a quelli idrogeologici, sismici, archeologici e forestali;\n    e) l’efficientamento energetico e la minimizzazione dell’impiego di risorse materiali non rinnovabili nell’intero ciclo di\n       vita delle opere;\n    f) il rispetto dei principi della sostenibilità economica, territoriale, ambientale e sociale dell’intervento, anche per\n       contrastare il consumo del suolo, incentivando il recupero, il riuso e la valorizz',
  },
  102: {
    title: 'Impegni dell’operatore economico',
    text: 'Art. 102. (Impegni dell’operatore economico)\n1. Nei bandi, negli avvisi e negli inviti le stazioni appaltanti, tenuto conto della prestazione oggeto del contratto,\n   richiedono agli operatori economici di assumere i seguenti impegni:\n   a) garantire la stabilità occupazionale del personale impiegato;\n   b) garantire l’applicazione dei contratti colletivi nazionali e territoriali di settore, tenendo conto, in relazione all’oggeto\n      dell’appalto e alle prestazioni da eseguire, anche in maniera prevalente, di quelli stipulati dalle associazioni dei datori\n      e dei prestatori di lavoro comparativamente più rappresentative sul piano nazionale e di quelli il cui ambito di\n      applicazione sia stretamente connesso con l’atività oggeto dell’appalto o della concessione svolta dall’impresa\n      anche in maniera prevalente, nonché garantire le stesse tutele economiche e normative per i lavoratori in\n      subappalto rispetto ai dipendenti dell’appaltatore e contro il lavoro irregolare;\n   c) garantire le pari opportunità generazionali, di genere e di inclusione lavorativa per le persone con disabilità o\n      svantaggiate.\n2. Per i fini di cui al comma 1 l’operatore economico indic',
  },
  50: {
    title: 'Procedure per l’affidamento',
    text: "Art. 50. (Procedure per l’affidamento)\n1. Salvo quanto previsto dagli articoli 62 e 63, le stazioni appaltanti procedono all'affidamento dei contratti di lavori, servizi\n    e forniture di importo inferiore alle soglie di cui all’articolo 14 con le seguenti modalità:\n   a) affidamento direto per lavori di importo inferiore a 150.000 euro, anche senza consultazione di più operatori\n      economici, assicurando che siano scelti soggeti in possesso di documentate esperienze pregresse idonee\n      all’esecuzione delle prestazioni contratuali anche individuati tra gli iscriti in elenchi o albi istituiti dalla stazione\n      appaltante;\n   b) affidamento direto dei servizi e forniture, ivi compresi i servizi di ingegneria e architetura e l'atività di\n      progetazione, di importo inferiore a 140.000 euro, anche senza consultazione di più operatori economici,\n      assicurando che siano scelti soggeti in possesso di documentate esperienze pregresse idonee all’esecuzione delle\n      prestazioni contratuali, anche individuati tra gli iscriti in elenchi o albi istituiti dalla stazione appaltante;\n   c) procedura negoziata senza bando, previa consultazione di almeno cinque operatori economic",
  },
  43: {
    title:
      'Metodi e strumenti di gestione informativa digitale delle costruzioni',
    text: 'Art. 43. (Metodi e strumenti di gestione informativa digitale delle costruzioni)\n1. A decorrere dal 1° gennaio 2025, le stazioni appaltanti e gli enti concedenti adotano metodi e strumenti di gestione\n   informativa digitale delle costruzioni per la progetazione e la realizzazione di opere di nuova costruzione e per gli\n   interventi su costruzioni esistenti per importo a base di gara superiore a 1 milione di euro. La disposizione di cui al primo\n   periodo non si applica agli interventi di ordinaria e straordinaria manutenzione, a meno che essi non riguardino opere\n   precedentemente eseguite con l’uso dei suddeti metodi e strumenti di gestione informativa digitale. (3)\n2. Anche al di fuori dei casi di cui al comma 1 e in conformità con i principi di cui all’articolo 19, le stazioni appaltanti e gli\n   enti concedenti possono adotare metodi e strumenti di gestione informativa digitale delle costruzioni, eventualmente\n   prevedendo nella documentazione di gara un punteggio premiale relativo alle modalità d’uso di tali metodi e strumenti.\n   Tale facoltà è subordinata all’adozione delle misure stabilite nell’allegato I.9, di cui al comma 4.\n3. Gli strumenti indicati ai commi 1 e 2 u',
  },
  28: {
    title: 'Trasparenza dei contratti pubblici',
    text: "Art. 28. (Trasparenza dei contratti pubblici)\n1. Le informazioni e i dati relativi alla programmazione di lavori, servizi e forniture, nonché alle procedure del ciclo di vita\n   dei contratti pubblici, ove non considerati riservati ai sensi dell'articolo 35 ovvero secretati ai sensi dell'articolo 139,\n   sono trasmessi tempestivamente alla Banca dati nazionale dei contratti pubblici atraverso le piataforme digitali di cui\n   all’articolo 25.\n2. Le stazioni appaltanti e gli enti concedenti assicurano il collegamento tra la sezione «Amministrazione trasparente» del\n   sito istituzionale e la Banca dati nazionale dei contratti pubblici, secondo le disposizioni di cui al decreto legislativo 14\n   marzo 2013, n. 33. Sono pubblicati nella predeta sezione di cui al primo periodo la composizione della commissione\n   giudicatrice e i curricula dei suoi componenti, nonché i resoconti della gestione finanziaria dei contratti al termine della\n   loro esecuzione.\n3. Per la trasparenza dei contratti pubblici fanno fede i dati trasmessi alla Banca dati nazionale dei contratti pubblici presso\n   l’ANAC, la quale assicura la tempestiva pubblicazione sul proprio portale dei dati ricevuti, anche atra",
  },
  13: {
    title: 'Ambito di applicazione',
    text: "Art. 13. (Ambito di applicazione)\n1. Le disposizioni del codice si applicano ai contratti di appalto e di concessione.\n2. Le disposizioni del codice non si applicano ai contratti esclusi, ai contratti ativi e ai contratti a titolo gratuito, anche\n   qualora essi offrano opportunità di guadagno economico, anche indireto.\n3. Le disposizioni del codice non si applicano ai contratti di società e alle operazioni straordinarie che non comportino\n   nuovi affidamenti di lavori, servizi e forniture. Restano ferme le disposizioni del testo unico in materia di società a\n   partecipazione pubblica, di cui al decreto legislativo 19 agosto 2016, n. 175, in materia di scelta del socio privato e di\n   cessione di quote o di azioni.\n4. Con regolamento del Ministro degli affari esteri e della cooperazione internazionale, adotato ai sensi dell’articolo 17,\n   comma 3, della legge 23 agosto 1988, n. 400, sentita l’Autorità nazionale anticorruzione (ANAC), sono disciplinate, le\n   procedure di scelta del contraente e l'esecuzione del contratto da svolgersi all'estero, tenuto conto dei principi\n   fondamentali del presente codice e delle procedure applicate dall'Unione europea e dalle organizzazioni in",
  },
  220: {
    title: 'Pareri di precontenzioso e legittimazione ad agire dell’ANAC',
    text: "Art. 220. (Pareri di precontenzioso e legittimazione ad agire dell’ANAC)\n1. Su iniziativa della stazione appaltante, dell’ente concedente o di una o più delle altre parti, l'ANAC esprime parere,\n   previo contradditorio, su questioni insorte durante lo svolgimento delle procedure di gara, entro trenta giorni dalla\n   ricezione della richiesta. L’operatore economico che abbia richiesto il parere o vi abbia aderito lo può impugnare\n   esclusivamente per violazione delle regole di dirito relative al merito della controversia. La stazione appaltante o l’ente\n   concedente che non intenda conformarsi al parere comunica, con provvedimento da adotare entro quindici giorni, le\n   relative motivazioni alle parti interessate e all’ANAC, che può proporre il ricorso di cui al comma 3.\n2. L'ANAC è legitimata ad agire in giudizio per l'impugnazione dei bandi, degli altri ati generali e dei provvedimenti relativi\n    a contratti di rilevante impato, emessi da qualsiasi stazione appaltante, qualora ritenga che essi violino le norme in\n    materia di contratti pubblici relativi a lavori, servizi e forniture.\n3. Se ritiene che una stazione appaltante abbia adotato un provvedimento viziato da gravi v",
  },
  121: {
    title: 'Sospensione dell’esecuzione',
    text: "Art. 121. (Sospensione dell’esecuzione)\n1. Quando ricorrano circostanze speciali, che impediscono in via temporanea che i lavori procedano utilmente a regola\n   d'arte, e che non fossero prevedibili al momento della stipulazione del contratto, il diretore dei lavori può disporre la\n   sospensione dell'esecuzione del contratto, compilando il verbale di sospensione, che è inoltrato, entro cinque giorni, al\n   RUP.\n2. La sospensione può, altresì, essere disposta dal RUP per ragioni di necessità o di pubblico interesse.\n3. Nelle ipotesi previste dai commi 1 e 2, per i lavori di realizzazione di opere pubbliche di importo pari o superiore alle\n   soglie di cui all’articolo 14, la sospensione è disposta dal RUP dopo aver acquisito il parere del collegio consultivo tecnico\n   ove costituito. Se la sospensione è imposta da gravi ragioni di ordine tecnico, idonee ad incidere sulla realizzazione a\n   regola d’arte dell’opera, in relazione alle modalità di superamento delle quali non vi è accordo tra le parti, si applica\n   l’articolo 216, comma 4.\n4. Fata salva l’ipotesi del secondo periodo del comma 3, la sospensione è disposta per il tempo stretamente necessario.\n    Cessate le relative ca",
  },
  174: {
    title: 'Nozione',
    text: 'Art. 174. (Nozione)\n1. Il partenariato pubblico-privato è un’operazione economica in cui ricorrono congiuntamente le seguenti carateristiche:\n   a) tra un ente concedente e uno o più operatori economici privati è instaurato un rapporto contratuale di lungo\n      periodo per raggiungere un risultato di interesse pubblico;\n   b) la copertura dei fabbisogni finanziari connessi alla realizzazione del progeto proviene in misura significativa da\n      risorse reperite dalla parte privata, anche in ragione del rischio operativo assunto dalla medesima;\n   c) alla parte privata speta il compito di realizzare e gestire il progeto, mentre alla parte pubblica quello di definire gli\n      obietivi e di verificarne l’attuazione;\n   d) il rischio operativo connesso alla realizzazione dei lavori o alla gestione dei servizi è allocato in capo al soggeto\n      privato.\n2. Per ente concedente, ai sensi della letera a) del comma 1, si intendono le amministrazioni aggiudicatrici e gli enti\n   aggiudicatori di cui all’articolo 1 della diretiva 2014/23/UE del Parlamento europeo e del Consiglio, del 26 febbraio\n   2014.\n3. Il partenariato pubblico-privato di tipo contratuale comprende le figure della conc',
  },
  30: {
    title:
      'Uso di procedure automatizzate nel ciclo di vita dei contratti pubblici',
    text: 'Art. 30. (Uso di procedure automatizzate nel ciclo di vita dei contratti pubblici)\n1. Per migliorare l’efficienza le stazioni appaltanti e gli enti concedenti provvedono, ove possibile, ad automatizzare le\n   proprie atività ricorrendo a soluzioni tecnologiche, ivi incluse l’intelligenza artificiale e le tecnologie di registri\n   distribuiti, nel rispetto delle specifiche disposizioni in materia.\n2. Nell’acquisto o sviluppo delle soluzioni di cui al comma 1 le stazioni appaltanti e gli enti concedenti:\n   a) assicurano la disponibilità del codice sorgente, della relativa documentazione, nonché di ogni altro elemento utile a\n      comprenderne le logiche di funzionamento;\n   b) introducono negli ati di indizione delle gare clausole volte ad assicurare le prestazioni di assistenza e manutenzione\n      necessarie alla correzione degli errori e degli effeti indesiderati derivanti dall’automazione.\n3. Le decisioni assunte mediante automazione rispetano i principi di:\n   a) conoscibilità e comprensibilità, per cui ogni operatore economico ha dirito a conoscere l’esistenza di processi\n      decisionali automatizzati che lo riguardino e, in tal caso, a ricevere informazioni significative s',
  },
  14: {
    title:
      'Soglie di rilevanza europea e metodi di calcolo dell’importo stimato degli appal',
    text: "Art. 14. (Soglie di rilevanza europea e metodi di calcolo dell’importo stimato degli appalti. Disciplina dei contratti misti)\n1. Per l'applicazione del codice le soglie di rilevanza europea sono: ( 1)\n   a) euro 5.538.000 per gli appalti pubblici di lavori e per le concessioni;\n\n1 (soglie modificate dal 1°gennaio 20124 dal Regolamento 15 novembre 2023, n. 2495)\n   b) euro 140.000 per gli appalti pubblici di forniture, di servizi e per i concorsi pubblici di progetazione aggiudicati dalle\n      stazioni appaltanti che sono autorità governative centrali indicate nell'allegato I alla diretiva 2014/24/UE del\n      Parlamento europeo e del Consiglio, del 26 febbraio 2014; se gli appalti pubblici di forniture sono aggiudicati da\n      stazioni appaltanti operanti nel settore della difesa, questa soglia si applica solo agli appalti concernenti i prodoti\n      menzionati nell'allegato III alla diretiva 2014/24/UE;\n   c) euro 221.000 per gli appalti pubblici di forniture, di servizi e per i concorsi pubblici di progetazione aggiudicati da\n      stazioni appaltanti sub-centrali; questa soglia si applica anche agli appalti pubblici di forniture aggiudicati dalle\n      autorità governative cen",
  },
  214: {
    title: 'Camera arbitrale, albo degli arbitri ed elenco dei segretari',
    text: "Art. 214. (Camera arbitrale, albo degli arbitri ed elenco dei segretari)\n1. Presso l'ANAC è istituita la Camera arbitrale per i contratti pubblici relativi a lavori, servizi, forniture.\n2. La Camera arbitrale cura la formazione e la tenuta dell'Albo degli arbitri per i contratti pubblici, redige il relativo codice\n   deontologico e provvede agli adempimenti necessari alla costituzione e al funzionamento del collegio arbitrale.\n3. Sono organi della Camera arbitrale il Presidente e il consiglio arbitrale.\n4. Il consiglio arbitrale, composto da cinque membri, è nominato dall'ANAC fra soggeti dotati di particolare competenza\n     nella materia dei contratti pubblici di lavori, servizi e forniture, per garantire l'indipendenza e l'autonomia dell'istituto,\n     nonché dotati dei requisiti di onorabilità stabiliti dalla medesima Autorità. Al suo interno, l'ANAC sceglie il Presidente.\n     L'incarico ha durata quinquennale ed è retribuito nella misura determinata dal provvedimento di nomina nei limiti delle\n     risorse atribuite all'Autorità stessa. Fermo restando quanto previsto dall'articolo 53 del decreto legislativo 30 marzo\n     2001, n. 165, come modificato dall’articolo 1, comma 42",
  },
  210: {
    title: 'Accordo bonario per i lavori',
    text: "Art. 210. (Accordo bonario per i lavori)\n1. Per i lavori pubblici di cui al Libro II, affidati da stazioni appaltanti o enti concedenti oppure dai concessionari, qualora\n   in seguito all'iscrizione di riserve sui documenti contabili l'importo economico dell'opera possa variare tra il 5 per cento\n   e il 15 per cento dell'importo contratuale, al fine del raggiungimento di un accordo bonario si applicano le disposizioni\n   di cui ai commi da 2 a 6.\n2. Il procedimento dell'accordo bonario riguarda tute le riserve iscrite fino al momento dell'avvio del procedimento\n   stesso e può essere reiterato quando le riserve iscrite, ulteriori e diverse rispetto a quelle già esaminate, raggiungano\n   nuovamente l'importo di cui al comma 1, nell'ambito comunque di un limite massimo complessivo del 15 per cento\n   dell'importo del contratto. Le domande che fanno valere pretese già oggeto di riserva non sono proposte per importi\n   maggiori rispetto a quelli quantificati nelle riserve stesse. Non sono oggeto di riserva gli aspeti progetuali che siano\n   stati oggeto di verifica ai sensi dell'articolo 42. Prima dell'approvazione del certificato di collaudo oppure di verifica di\n   conformità o del ",
  },
  110: {
    title: 'Offerte anormalmente basse',
    text: "Art. 110. (Offerte anormalmente basse)\n1. Le stazioni appaltanti valutano la congruità, la serietà, la sostenibilità e la realizzabilità della migliore offerta, che in base\n   a elementi specifici, inclusi i costi dichiarati ai sensi dell’articolo 108, comma 9, appaia anormalmente bassa. Il bando o\n   l’avviso indicano gli elementi specifici ai fini della valutazione.\n2. In presenza di un’offerta che appaia anormalmente bassa le stazioni appaltanti richiedono per iscrito all’operatore\n   economico le spiegazioni sul prezzo o sui costi proposti, assegnando a tal fine un termine non superiore a quindici giorni.\n3. Le spiegazioni di cui al comma 2 possono riguardare i seguenti elementi:\n   a) l'economia del processo di fabbricazione dei prodoti, dei servizi prestati o del metodo di costruzione;\n   b) le soluzioni tecniche prescelte o le condizioni eccezionalmente favorevoli di cui dispone l'offerente per fornire i\n      prodoti, per prestare i servizi o per eseguire i lavori;\n   c) l'originalità dei lavori, delle forniture o dei servizi proposti dall'offerente.\n4. Non sono ammesse giustificazioni:\n   a) in relazione a tratamenti salariali minimi inderogabili stabiliti dalla legge o da",
  },
  103: {
    title:
      'Requisiti di partecipazione a procedure di lavori di rilevante importo',
    text: "Art. 103. (Requisiti di partecipazione a procedure di lavori di rilevante importo)\n1. Per gli appalti di lavori di importo pari o superiore ai 20 milioni di euro, oltre ai requisiti di cui all'articolo 100, la stazione\n   appaltante può richiedere requisiti aggiuntivi:\n   a) per verificare la capacità economico-finanziaria dell’operatore economico; in tal caso quest’ultimo fornisce i\n      parametri economico-finanziari significativi richiesti, certificati da società di revisione ovvero da altri soggeti\n      preposti che si affianchino alle valutazioni tecniche proprie dell'organismo di certificazione, da cui emerga in modo\n      inequivoco l’esposizione finanziaria dell’operatore economico al momento in cui partecipa a una gara di appalto; in\n      alternativa, la stazione appaltante può richiedere un volume d'affari in lavori pari a due volte l'importo a base di\n      gara, che l’operatore economico deve aver realizzato nei migliori cinque dei dieci anni antecedenti alla data di\n      pubblicazione del bando;\n   b) per verificare la capacità professionale per gli appalti per i quali è richiesta la classifica illimitata; in tal caso\n       l’operatore economico fornisce prova di ",
  },
  4: {
    title: 'Criterio interpretativo e applicativo',
    text: 'Art. 4. (Criterio interpretativo e applicativo)\n1. Le disposizioni del codice si interpretano e si applicano in base ai principi di cui agli articoli 1, 2 e 3.',
  },
  108: {
    title:
      'Criteri di aggiudicazione degli appalti di lavori, servizi e forniture',
    text: "Art. 108. (Criteri di aggiudicazione degli appalti di lavori, servizi e forniture)\n1. Fate salve le disposizioni legislative, regolamentari o amministrative relative al prezzo di determinate forniture o alla\n   remunerazione di servizi specifici, le stazioni appaltanti procedono all'aggiudicazione degli appalti di lavori, servizi e\n   forniture e all'affidamento dei concorsi di progetazione e dei concorsi di idee sulla base del criterio dell'offerta\n   economicamente più vantaggiosa, individuata sulla base del miglior rapporto qualità/prezzo o sulla base dell'elemento\n   prezzo o del costo, seguendo un criterio di comparazione costo/efficacia quale il costo del ciclo di vita, conformemente\n   a quanto previsto dall’allegato II.8, con riguardo al costo del ciclo di vita.\n2. Sono aggiudicati esclusivamente sulla base del criterio dell'offerta economicamente più vantaggiosa individuata sulla\n   base del miglior rapporto qualità/prezzo:\n   a) i contratti relativi ai servizi sociali e di ristorazione ospedaliera, assistenziale e scolastica, nonché ai servizi ad alta\n      intensità di manodopera, come definiti dall’articolo 2, comma 1, letera e), dell’allegato I.1;\n   b) i contratti rel",
  },
  74: {
    title: 'Dialogo competitivo',
    text: 'Art. 74. (Dialogo competitivo)\n1. Nel dialogo competitivo qualsiasi operatore economico può chiedere di partecipare in risposta a un bando di gara, o a\n   un avviso di indizione di gara, fornendo le informazioni richieste dalla stazione appaltante.\n2. Il termine minimo per la ricezione delle domande di partecipazione è di trenta giorni dalla data di trasmissione del\n   bando di gara ai sensi dell’articolo 84.\n3. Le stazioni appaltanti indicano nel bando di gara o nell’avviso di indizione di gara o in un documento descritivo allegato\n   le esigenze che intendono perseguire, i requisiti da soddisfare, il criterio di aggiudicazione, la durata indicativa della\n   procedura nonché eventuali premi o pagamenti per i partecipanti al dialogo. L’appalto è aggiudicato unicamente sulla\n   base del criterio dell’offerta con il miglior rapporto qualità/prezzo conformemente all’articolo 108.\n4. Prima dell’avvio del dialogo le stazioni appaltanti possono organizzare una consultazione con gli operatori economici\n   selezionati sulla base della documentazione posta a base di gara e sulle modalità di svolgimento del dialogo. Nei trenta\n   giorni successivi alla conclusione della consultazione i parte',
  },
  106: {
    title: 'Garanzie per la partecipazione alla procedura',
    text: "Art. 106. (Garanzie per la partecipazione alla procedura)\n1. L’offerta è corredata da una garanzia provvisoria pari al 2 per cento del valore complessivo della procedura indicato nel\n   bando o nell’invito. Per rendere l’importo della garanzia proporzionato e adeguato alla natura delle prestazioni oggeto\n   dell’affidamento e al grado di rischio a esso connesso, la stazione appaltante può motivatamente ridurre l'importo sino\n   all’1 per cento oppure incrementarlo sino al 4 per cento. Nel caso di procedure di gara realizzate in forma aggregata da\n   centrali di commitenza, l’importo della garanzia è fissato nel bando o nell’invito nella misura massima del 2 per cento\n   del valore complessivo della procedura. In caso di partecipazione alla gara di un raggruppamento temporaneo di\n   imprese, anche se non ancora costituito, la garanzia deve coprire le obbligazioni di ciascuna impresa del\n   raggruppamento medesimo. La garanzia provvisoria può essere costituita soto forma di cauzione oppure di\n   fideiussione.\n2. La cauzione è costituita presso l’istituto incaricato del servizio di tesoreria o presso le aziende autorizzate, a titolo di\n   pegno a favore della stazione appaltante, escl",
  },
  40: {
    title: 'Dibattito pubblico',
    text: 'Art. 40. (Dibattito pubblico)\n1. Salvi i casi di dibatito pubblico obbligatorio indicati nell’allegato I.6, la stazione appaltante o l’ente concedente può\n    indire il dibatito pubblico, ove ne ravvisi l’opportunità in ragione della particolare rilevanza sociale dell’intervento e del\n    suo impato sull’ambiente e sul territorio, garantendone in ogni caso la celerità.\n2. In sede di prima applicazione del codice, l’allegato I.6 è abrogato a decorrere dalla data di entrata in vigore di un\n   corrispondente regolamento adotato ai sensi dell’articolo 17, comma 3, della legge 23 agosto 1988, n. 400, con decreto\n   del Presidente del Consiglio dei ministri su proposta del Ministro delle infrastruture e dei trasporti, sentiti il Ministro\n   dell’ambiente e della sicurezza energetica e il Ministro della cultura, che lo sostituisce integralmente anche in qualità di\n   allegato al codice.\n3. Il dibatito pubblico si apre con la pubblicazione sul sito istituzionale della stazione appaltante o dell’ente concedente\n   di una relazione contenente il progeto dell’opera e l’analisi di fatibilità delle eventuali alternative progetuali.\n4    Le amministrazioni statali interessate alla realizzazione ',
  },
  8: {
    title:
      'Principio di autonomia contrattuale. Divieto di prestazioni d’opera intellettual',
    text: 'Art. 8. (Principio di autonomia contrattuale. Divieto di prestazioni d’opera intellettuale a titolo gratuito)\n1. Nel perseguire le proprie finalità istituzionali le pubbliche amministrazioni sono dotate di autonomia contratuale e\n   possono concludere qualsiasi contratto, anche gratuito, salvi i divieti espressamente previsti dal codice e da altre\n   disposizioni di legge.\n2. Le prestazioni d’opera intelletuale non possono essere rese dai professionisti gratuitamente, salvo che in casi eccezionali\n    e previa adeguata motivazione. Salvo i predeti casi eccezionali, la pubblica amministrazione garantisce comunque\n    l’applicazione del principio dell’equo compenso.\n3. Le pubbliche amministrazioni possono ricevere per donazione beni o prestazioni rispondenti all’interesse pubblico\n   senza obbligo di gara. Restano ferme le disposizioni del codice civile in materia di forma, revocazione e azione di\n   riduzione delle donazioni.',
  },
  219: {
    title: 'Scioglimento del collegio consultivo tecnico',
    text: "Art. 219. (Scioglimento del collegio consultivo tecnico)\n1. Il collegio consultivo tecnico è sciolto al termine dell'esecuzione del contratto oppure, nelle ipotesi in cui non ne è\n   obbligatoria la costituzione, anche in un momento anteriore su accordo delle parti.",
  },
  223: {
    title:
      'Ministero delle infrastrutture e dei trasporti e struttura tecnica di missione',
    text: "Art. 223. (Ministero delle infrastrutture e dei trasporti e struttura tecnica di missione)\n1. Nell'ambito delle funzioni di cui al decreto legislativo 30 luglio 1999, n. 300, il Ministero delle infrastruture e dei\n   trasporti promuove le atività tecniche e amministrative occorrenti per l’adeguata e sollecita progetazione e\n   approvazione delle infrastruture ed effetua, con la collaborazione delle regioni o province autonome interessate, le\n   atività di supporto necessarie per la vigilanza, da parte dell'autorità competente, sulla realizzazione delle infrastruture.\n2. Nello svolgimento delle funzioni di cui al comma 1, il Ministero delle infrastruture e dei trasporti impronta la propria\n   atività al principio di leale collaborazione con le regioni e le province autonome e con gli enti locali interessati e\n   acquisisce, nei casi indicati dalla legge, la previa intesa delle regioni o province autonome interessate. Ai fini di cui al\n   comma 1, il Ministero delle infrastruture e dei trasporti, in particolare:\n   a) promuove e riceve le proposte delle regioni o province autonome e degli altri enti aggiudicatori;\n   b) promuove e propone intese quadro tra Governo e singole regioni o",
  },
  66: {
    title:
      'Operatori economici per l’affidamento dei servizi di architettura e di ingegneri',
    text: "Art. 66. (Operatori economici per l’affidamento dei servizi di architettura e di ingegneria)\n1. Sono ammessi a partecipare alle procedure di affidamento dei servizi atinenti all'architetura e all'ingegneria nel\n   rispetto del principio di non discriminazione fra i diversi soggeti sulla base della forma giuridica assunta:\n   a) i prestatori di servizi di ingegneria e architetura: i professionisti singoli, associati, le società tra professionisti di cui\n      alla letera b), le società di ingegneria di cui alla letera c), i consorzi, i GEIE, i raggruppamenti temporanei fra i\n      predeti soggeti che rendono a commitenti pubblici e privati, operando sul mercato, servizi di ingegneria e di\n      architetura, nonché atività tecnico-amministrative e studi di fatibilità economico-finanziaria ad esse connesse, ivi\n      compresi, con riferimento agli interventi inerenti al restauro e alla manutenzione di beni mobili e delle superfici\n      decorate di beni architetonici, i soggeti con qualifica di restauratore di beni culturali ai sensi della vigente\n      normativa, gli archeologi professionisti, singoli e associati, e le società da essi costituite;\n   b) le società di professionisti: l",
  },
  19: {
    title: 'Principi e diritti digitali',
    text: "Art. 19. (Principi e diritti digitali)\n1. Le stazioni appaltanti e gli enti concedenti assicurano la digitalizzazione del ciclo di vita dei contratti nel rispetto dei\n   principi e delle disposizioni del codice dell'amministrazione digitale, di cui al decreto legislativo 7 marzo 2005, n. 82,\n   garantiscono l’esercizio dei diriti di citadinanza digitale e operano secondo i principi di neutralità tecnologica, di\n   trasparenza, nonché di protezione dei dati personali e di sicurezza informatica.\n2. In attuazione del principio dell’unicità dell’invio, ciascun dato è fornito una sola volta a un solo sistema informativo, non\n    può essere richiesto da altri sistemi o banche dati, ma è reso disponibile dal sistema informativo ricevente. Tale principio\n    si applica ai dati relativi a programmazione di lavori, opere, servizi e forniture, nonché a tute le procedure di\n    affidamento e di realizzazione di contratti pubblici soggete al presente codice e a quelle da esso escluse, in tuto o in\n    parte, ogni qualvolta siano imposti obblighi di comunicazione a una banca dati o a un sistema informativo.\n3. Le atività e i procedimenti amministrativi connessi al ciclo di vita dei contratti pub",
  },
  141: {
    title: 'Ambito e norme applicabili',
    text: 'Art. 141. (Ambito e norme applicabili)\n1. Le disposizioni del presente Libro si applicano alle stazioni appaltanti o agli enti concedenti che svolgono una delle\n   atività previste dagli articoli da 146 a 152. Le disposizioni del presente Libro si Si applicano, altresì, agli altri soggeti\n   che annoverano tra le loro atività una o più tra quelle previste dagli articoli da 146 a 152 e operano in virtù di diriti\n   speciali o esclusivi.\n2. Le imprese pubbliche e i soggeti titolari di diriti speciali o esclusivi applicano le disposizioni del presente Libro solo per\n   i contratti strumentali da un punto di vista funzionale a una delle atività previste dagli articoli da 146 a 152.\n3. Ai contratti di cui al presente Libro si applicano, oltre alle sue disposizioni:\n   a) il Libro I, Parte I, Titolo I, ecceto l’articolo 6;\n   b) nell’ambito del Libro I, Parte I, Titolo II, gli articoli 13, 14, 16, 17 e 18. L’articolo 15 si applica solo alle stazioni\n      appaltanti e agli enti concedenti che sono amministrazioni aggiudicatrici;\n   c) il Libro I, Parte II;\n   d) nell’ambito del Libro I, Parte IV, gli articoli 41, 42, 43, 44, 45 e 46;\n   e) nell’ambito del Libro II, Parte II, gli articoli',
  },
  6: {
    title:
      'Principi di solidarietà e di sussidiarietà orizzontale. Rapporti con gli enti de',
    text: 'Art. 6. (Principi di solidarietà e di sussidiarietà orizzontale. Rapporti con gli enti del Terzo settore)\n1. In attuazione dei principi di solidarietà sociale e di sussidiarietà orizzontale, la pubblica amministrazione può apprestare,\n   in relazione ad atività a spiccata valenza sociale, modelli organizzativi di amministrazione condivisa, privi di rapporti\n   sinallagmatici, fondati sulla condivisione della funzione amministrativa gli enti del Terzo settore di cui al codice del Terzo\n   settore di cui al decreto legislativo 3 luglio 2017, n. 117, sempre che gli stessi i contribuiscano al perseguimento delle\n   finalità sociali in condizioni di pari tratamento, in modo effetivo e trasparente e in base al principio del risultato. Non\n   rientrano nel campo di applicazione del presente codice gli istituti disciplinati dal Titolo VII del codice del Terzo settore,\n   di cui al decreto legislativo n. 117 del 2017.',
  },
  222: {
    title: 'Autorità nazionale anticorruzione (ANAC',
    text: "Art. 222. (Autorità nazionale anticorruzione (ANAC))\n1. La vigilanza e il controllo sui contratti pubblici sono atribuiti, nei limiti di quanto stabilito dal codice, all'Autorità\n   nazionale anticorruzione (ANAC), che agisce anche al fine di prevenire e contrastare illegalità e corruzione.\n2. L'ANAC, atraverso bandi-tipo, capitolati-tipo, contratti-tipo e altri ati amministrativi generali, garantisce la promozione\n   dell'efficienza, della qualità dell'atività delle stazioni appaltanti, cui fornisce supporto anche facilitando lo scambio di\n   informazioni e la omogeneità dei procedimenti amministrativi e favorisce lo sviluppo delle migliori pratiche. Trasmete\n   alle Camere, immediatamente dopo la loro adozione, gli ati di cui al primo periodo ritenuti maggiormente rilevanti in\n   termini di impato, per numero di operatori potenzialmente coinvolti, riconducibilità a fatispecie criminose, situazioni\n   anomale o comunque sintomatiche di condote illecite da parte delle stazioni appaltanti. Resta ferma l'impugnabilità\n   delle decisioni e degli ati assunti dall'ANAC innanzi ai competenti organi di giustizia amministrativa. L'ANAC, per\n   l'adozione dei bandi-tipo, dei capitolati-tipo",
  },
  124: {
    title:
      'Esecuzione o completamento dei lavori, servizi o forniture nel caso di procedura',
    text: "Art. 124. (Esecuzione o completamento dei lavori, servizi o forniture nel caso di procedura di insolvenza o di impedimento\n         alla prosecuzione dell’affidamento con l’esecutore designato)\n1. Fato salvo quanto previsto dai commi 4 e 5, in caso di liquidazione giudiziale, di liquidazione coata e concordato\n   preventivo, oppure di risoluzione del contratto ai sensi dell’articolo 122 o di recesso dal contratto ai sensi dell'articolo\n   88, comma 4-ter, del codice delle leggi antimafia e delle misure di prevenzione, di cui al decreto legislativo 6 setembre\n   2011, n. 159, oppure in caso di dichiarazione giudiziale di inefficacia del contratto, le stazioni appaltanti interpellano\n   progressivamente i soggeti che hanno partecipato all'originaria procedura di gara, risultanti dalla relativa graduatoria,\n   per stipulare un nuovo contratto per l'affidamento dell'esecuzione o del completamento dei lavori, servizi o forniture,\n   se tecnicamente ed economicamente possibile.\n2. L'affidamento avviene alle medesime condizioni già proposte dall'originario aggiudicatario in sede in offerta. Le stazioni\n   appaltanti possono prevedere nei documenti di gara che il nuovo affidamento avvenga ",
  },
  120: {
    title: 'Modifica dei contratti in corso di esecuzione',
    text: "Art. 120. (Modifica dei contratti in corso di esecuzione)\n1. Fermo quanto previsto dall’articolo 60 per le clausole di revisione dei prezzi, i contratti di appalto possono essere\n   modificati senza una nuova procedura di affidamento nei casi seguenti, sempre che, nelle ipotesi previste dalle letere\n   a) e c), nonostante le modifiche, la strutura del contratto o dell’accordo quadro e l’operazione economica sotesa\n   possano ritenersi inalterate:\n   a) se le modifiche, a prescindere dal loro valore monetario, sono state previste in clausole chiare, precise e inequivocabili\n       dei documenti di gara iniziali, che possono consistere anche in clausole di opzione; per i contratti relativi a servizi o\n       forniture stipulati dai soggeti aggregatori restano ferme le disposizioni di cui all'articolo 1, comma 511, della legge\n       28 dicembre 2015, n. 208;\n   b) per la sopravvenuta necessità di lavori, servizi o forniture supplementari, non previsti nell'appalto iniziale, ove un\n      cambiamento del contraente nel contempo:\n   1) risulti impraticabile per motivi economici o tecnici;\n   2) comporti per la stazione appaltante notevoli disagi o un sostanziale incremento dei costi;\n  ",
  },
  37: {
    title: 'Programmazione dei lavori e degli acquisti di beni e servizi',
    text: 'Art. 37. (Programmazione dei lavori e degli acquisti di beni e servizi)\n1. Le stazioni appaltanti e gli enti concedenti:\n   a) adotano il programma triennale dei lavori pubblici e il programma triennale degli acquisti di beni e servizi. I\n      programmi sono approvati nel rispetto dei documenti programmatori e in coerenza con il bilancio e, per gli enti\n      locali, secondo le norme della programmazione economico-finanziaria e i principi contabili;\n   b) approvano l’elenco annuale che indica i lavori da avviare nella prima annualità e specifica per ogni opera la fonte di\n      finanziamento, stanziata nello stato di previsione o nel bilancio o comunque disponibile.\n2. Il programma triennale dei lavori pubblici e i relativi aggiornamenti annuali contengono i lavori, compresi quelli complessi\n     e da realizzare tramite concessione o partenariato pubblico-privato, il cui importo si stima pari o superiore alla soglia di\n     cui all’articolo 50, comma 1, letera a). I lavori di importo pari o superiore alla soglia di rilevanza europea di cui all’articolo\n     14, comma 1, letera a), sono inseriti nell’elenco triennale dopo l’approvazione del documento di fatibilità delle\n     altern',
  },
  16: {
    title: 'Conflitto di interessi',
    text: 'Art. 16. (Conflitto di interessi)\n1. Si ha conflito di interessi quando un soggeto che, a qualsiasi titolo, interviene con compiti funzionali nella procedura\n   di aggiudicazione o nella fase di esecuzione degli appalti o delle concessioni e ne può influenzare, in qualsiasi modo, il\n   risultato, gli esiti e la gestione, ha diretamente o indiretamente un interesse finanziario, economico o altro interesse\n   personale che può essere percepito come una alla sua imparzialità e indipendenza nel contesto della procedura di\n   aggiudicazione o nella fase di esecuzione. 2\n2. In coerenza con il principio della fiducia e per preservare la funzionalità dell’azione amministrativa, la percepita minaccia\n   all’imparzialità e indipendenza deve essere provata da chi invoca il conflito sulla base di presupposti specifici e\n   documentati e deve riferirsi a interessi effetivi, la cui soddisfazione sia conseguibile solo subordinando un interesse\n   all’altro.\n3. Il personale che versa nelle ipotesi di cui al comma 1 ne dà comunicazione alla stazione appaltante o all’ente concedente\n   e si astiene dal partecipare alla procedura di aggiudicazione e all’esecuzione.\n4. Le stazioni appaltanti adotano m',
  },
  26: {
    title: 'Regole tecniche',
    text: 'Art. 26. (Regole tecniche)\n1. I requisiti tecnici delle piataforme di approvvigionamento digitale, nonché la conformità di dete piataforme a quanto\n   disposto dall’articolo 22, comma 2, sono stabilite dall’AGID di intesa con l’ANAC e la Presidenza del Consiglio dei ministri,\n   Dipartimento per la trasformazione digitale, entro sessanta giorni dalla data di entrata in vigore del codice.\n2. Con il medesimo provvedimento di cui al comma 1, sono stabilite le modalità per la certificazione delle piataforme di\n   approvvigionamento digitale.\n3. La certificazione delle piataforme di approvvigionamento digitale, rilasciata dall’AGID, consente l’integrazione con i\n   servizi della Banca dati nazionale dei contratti pubblici. L’ANAC cura e gestisce il registro delle piataforme certificate.',
  },
  114: {
    title: 'Direzione dei lavori e dell’esecuzione dei contratti',
    text: "Art. 114. (Direzione dei lavori e dell’esecuzione dei contratti)\n1. L’esecuzione dei contratti aventi ad oggeto lavori, servizi o forniture è direta dal RUP, che controlla i livelli di qualità\n   delle prestazioni. Il RUP, nella fase dell'esecuzione, si avvale del diretore dell'esecuzione del contratto o del diretore\n   dei lavori, del coordinatore in materia di salute e di sicurezza durante l'esecuzione previsto dal decreto legislativo 9\n   aprile 2008, n. 81, nonché del collaudatore oppure della commissione di collaudo o del verificatore della conformità e\n   accerta il correto ed effetivo svolgimento delle funzioni ad ognuno affidate.\n2. Per la direzione e il controllo dell'esecuzione dei contratti relativi a lavori le stazioni appaltanti nominano, prima\n   dell'avvio della procedura per l'affidamento, su proposta del RUP, un diretore dei lavori che può essere coadiuvato, in\n   relazione alla complessità dell'intervento, da un ufficio di direzione dei lavori, costituito da uno o più diretori operativi\n   e da ispetori di cantiere, ed eventualmente dalle figure previste nell’allegato I.9.\n3. Il diretore dei lavori, con l'ufficio di direzione dei lavori, ove costituito, è preposto",
  },
  193: {
    title: 'Procedura di affidamento',
    text: "Art. 193. (Procedura di affidamento)\n1. Gli operatori economici possono presentare agli enti concedenti proposte relative alla realizzazione in concessione di\n   lavori o servizi. Ciascuna proposta contiene un progeto di fatibilità, una bozza di convenzione, il piano economico-\n   finanziario asseverato e la specificazione delle carateristiche del servizio e della gestione. Il piano economico-finanziario\n   comprende l'importo delle spese sostenute per la predisposizione della proposta, comprensivo anche dei diriti sulle\n   opere dell'ingegno. Gli investitori istituzionali di cui all'articolo 32, comma 3, del decreto-legge 31 maggio 2010, n. 78,\n   convertito, con modificazioni, dalla legge 30 luglio 2010, n. 122, nonché i soggeti di cui all’articolo 2, numero 3), del\n   regolamento (UE) 2015/1017 del Parlamento europeo e del Consiglio, del 25 giugno 2015, possono formulare le\n   proposte di cui al primo periodo salva la necessità, nella successiva gara per l’affidamento dei lavori o dei servizi, di\n   associarsi o consorziarsi con operatori economici in possesso dei requisiti richiesti dal bando, qualora gli stessi investitori\n   istituzionali ne siano privi. Gli investitori istit",
  },
  199: {
    title: 'Privilegio sui crediti e ulteriori garanzie',
    text: "Art. 199. (Privilegio sui crediti e ulteriori garanzie)\n1. I crediti dei soggeti che finanziano o rifinanziano, in qualunque forma, la realizzazione di lavori pubblici, di opere di\n   interesse pubblico o la gestione di pubblici servizi hanno privilegio generale, ai sensi degli articoli 2745 e seguenti del\n   codice civile, sui beni mobili, ivi inclusi i crediti, del concessionario, delle società di scopo, delle società affidatarie, a\n   qualunque titolo, di contratti di partenariato pubblico-privato, oppure di contraenti generali.\n2. Il privilegio, a pena di nullità del contratto di finanziamento, deve risultare da ato scrito. Nell'ato sono esatamente\n   descriti i finanziatori originari dei crediti, il debitore, l'ammontare in linea capitale del finanziamento o della linea di\n   credito, nonché gli elementi che costituiscono il finanziamento.\n3. L'opponibilità ai terzi del privilegio sui beni è subordinata alla trascrizione, nel registro indicato dall'articolo 1524,\n   secondo comma, del codice civile, dell'ato dal quale il privilegio risulta. Della costituzione del privilegio è dato avviso\n   mediante pubblicazione nella Gazzeta ufficiale della Repubblica italiana. Dall'avviso d",
  },
  38: {
    title: 'Localizzazione e approvazione del progetto delle opere',
    text: "Art. 38. (Localizzazione e approvazione del progetto delle opere)\n1. L'approvazione dei progeti da parte delle amministrazioni è effetuata in conformità alla legge 7 agosto 1990, n. 241, e\n   alle disposizioni statali e regionali che regolano la materia. La procedura di cui al presente articolo si applica anche alle\n   opere di interesse pubblico, ivi comprese quelle di cui al decreto legislativo 3 aprile 2006, n. 152, se concernenti la\n   concessione e la gestione di opere pubbliche, oppure la concessione di servizi pubblici con opere da realizzare da parte\n   del concessionario.\n2. La procedura di cui al presente articolo non si applica se è stata già accertata la conformità del progeto di fatibilità\n   tecnica ed economica alla pianificazione urbanistica e alla regolamentazione edilizia:\n   a) per le opere pubbliche di interesse statale, escluse quelle destinate alla difesa militare, dal Ministero delle\n      infrastruture e dei trasporti, sentiti gli enti territoriali interessati;\n   b) per le opere pubbliche di interesse locale, dal comune, oppure dalla regione o dalla provincia autonoma interessata\n      in caso di opere interessanti il territorio di almeno due comuni.\n3. La ",
  },
  51: {
    title: 'Commissione giudicatrice',
    text: "Art. 51. (Commissione giudicatrice)\n1. Nel caso di aggiudicazione dei contratti di cui alla presente Parte con il criterio dell'offerta economicamente più\n   vantaggiosa, alla commissione giudicatrice può partecipare il RUP, anche in qualità di presidente.",
  },
  73: {
    title: 'Procedura competitiva con negoziazione',
    text: "Art. 73. (Procedura competitiva con negoziazione)\n1. Nelle procedure competitive con negoziazione qualsiasi operatore economico può presentare una domanda di\n   partecipazione in risposta a un avviso di indizione di gara contenente le informazioni di cui all'allegato II.6, Parte I, letere\n   B o C, fornendo le informazioni richieste dalla stazione appaltante.\n2. Nei documenti di gara le stazioni appaltanti individuano l'oggeto dell'appalto fornendo una descrizione delle loro\n   esigenze, illustrando le carateristiche richieste per le forniture, i lavori o i servizi da appaltare e specificando i criteri\n   per l'aggiudicazione dell'appalto. Esse precisano altresì quali elementi della descrizione definiscono i requisiti minimi\n   che tuti gli offerenti devono soddisfare.\n3. Le informazioni fornite consentono agli operatori economici di individuare la natura e l'ambito dell'appalto e decidere\n   se partecipare alla procedura.\n4. Il termine minimo per la ricezione delle domande di partecipazione è di trenta giorni dalla data di trasmissione del\n   bando di gara ai sensi dell’articolo 84 o, se è utilizzato come mezzo di indizione di una gara un avviso di pre-informazione,\n   dalla data ",
  },
  197: {
    title: 'Definizione e disciplina',
    text: "Art. 197. (Definizione e disciplina)\n1. Le parti determinano il contenuto del contratto di disponibilità nei limiti imposti dalle disposizioni di cui al presente\n   articolo, tenendo conto dei bandi-tipo e dei contratti-tipo redati dall’Autorità di regolazione del settore.\n2. Il corrispetivo del contratto di disponibilità si compone di un canone di disponibilità, commisurato all’effetivo periodo\n   per il quale l’operatore economico ha garantito il godimento dell’opera, sempre che il mancato o ridoto godimento non\n   rientri nel rischio a carico dell’ente concedente ai sensi del comma 4.\n3. Quando è convenuto il trasferimento della proprietà dell'opera all’ente concedente il corrispetivo si compone anche:\n   a) di un eventuale contributo in corso d'opera, non superiore al 50 per cento del costo di costruzione dell'opera;\n   b) di un prezzo di trasferimento, da pagare al termine del contratto, determinato in relazione al valore di mercato\n      residuo dell'opera e tenendo conto dell’importo già versato a titolo di canone di disponibilità e di eventuale\n      contributo in corso d'opera.\n4. Se non è diversamente convenuto tra le parti e salvo quanto disposto dal comma 5, il rischio ",
  },
  209: {
    title:
      "Modifiche al codice del processo amministrativo di cui all'allegato 1 al decreto",
    text: "Art. 209. (Modifiche al codice del processo amministrativo di cui all'allegato 1 al decreto legislativo n. 104 del 2010)\n1. Al codice del processo amministrativo, di cui all'allegato 1 al decreto legislativo 2 luglio 2010, n. 104, sono apportate le\n   seguenti modificazioni:\n   a) l’articolo 120 è sostituito dal seguente: «Art. 120 – (Disposizioni specifiche ai giudizi di cui all'articolo 119, comma\n      1, letera a)) – (omissis)»;\n   b) l’articolo 121 è sostituito dal seguente: «Art. 121 – (Inefficacia del contratto nei casi di gravi violazioni) – (omissis)»;\n   c) all’articolo 123, comma 1, alinea, le parole: «di cui all’articolo 121, comma 4» sono sostituite dalle seguenti: «di cui\n      all’articolo 121, comma 5»;\n   d) l’articolo 124 è sostituito dal seguente: «Art. 124 – (Tutela in forma specifica e per equivalente) – (omissis)».\n\nTitolo II - I rimedi alternativi alla tutela giurisdizionale)",
  },
  67: {
    title: 'Consorzi non necessari',
    text: "Art. 67. (Consorzi non necessari)\n1. I requisiti di capacità tecnica e finanziaria per l’ammissione alle procedure di affidamento dei soggeti di cui agli articoli\n   65, comma 2, letere b), c) e d), e 66, comma 1, letera g), sono disciplinati dal regolamento di cui all’articolo 100, comma\n   4.\n2. L’allegato II.12 disciplina, nelle more dell’adozione del regolamento di cui all’articolo 100, comma 4, la qualificazione\n   degli operatori economici, fermo restando che:\n   a) per gli appalti di servizi e forniture, i requisiti di capacità tecnica e finanziaria sono computati cumulativamente in\n      capo al consorzio ancorché posseduti dalle singole imprese consorziate;\n   b) per gli appalti di lavori, i requisiti di capacità tecnica e finanziaria per l'ammissione alle procedure di affidamento\n      sono posseduti e comprovati dagli stessi sulla base delle qualificazioni possedute dalle singole imprese consorziate.\n3. Per gli operatori di cui agli articoli 65, comma 2, letere c) e d) e 66, comma 1, letera g), i requisiti generali di cui agli\n   articoli 94 e 95 sono posseduti sia dalle consorziate esecutrici che dalle consorziate che prestano i requisiti. Le\n   autorizzazioni e gli alt",
  },
  70: {
    title: 'Procedure di scelta e relativi presupposti',
    text: "Art. 70. (Procedure di scelta e relativi presupposti)\n1. Per l'aggiudicazione di appalti pubblici le stazioni appaltanti utilizzano la procedura aperta, la procedura ristreta, la\n   procedura competitiva con negoziazione, il dialogo competitivo e il partenariato per l’innovazione.\n2. Nei soli casi previsti dall’articolo 76 le stazioni appaltanti possono utilizzare la procedura negoziata senza pubblicazione\n   di un bando di gara.\n3. Le stazioni appaltanti utilizzano la procedura competitiva con negoziazione o il dialogo competitivo:\n   a) per l'aggiudicazione di contratti di lavori, forniture o servizi in presenza di una o più delle seguenti condizioni:\n   1) quando le esigenze della stazione appaltante perseguite con l’appalto non possono essere soddisfate con le altre\n      procedure;\n   2) quando le esigenze della stazione appaltante implicano soluzioni o progeti innovativi;\n   3) quando l'appalto non può essere aggiudicato senza preventive negoziazioni a causa di circostanze particolari in\n      relazione alla natura, complessità o impostazione finanziaria e giuridica dell’oggeto dell’appalto o a causa dei rischi\n      a esso connessi;\n   4) quando le specifiche tecniche non po",
  },
  24: {
    title: 'Fascicolo virtuale dell’operatore economico',
    text: "Art. 24. (Fascicolo virtuale dell’operatore economico)\n1. Presso la Banca dati nazionale dei contratti pubblici opera il fascicolo virtuale dell'operatore economico che consente la\n    verifica dell'assenza delle cause di esclusione di cui agli articoli 94 e 95 e per l'atestazione dei requisiti di cui all'articolo\n    103 per i soggeti esecutori di lavori pubblici, nonché dei dati e dei documenti relativi ai criteri di selezione requisiti di\n    cui all'articolo 100 che l'operatore economico inserisce.\n2. Il fascicolo virtuale dell'operatore economico è utilizzato per la partecipazione alle procedure di gara affidamento\n   disciplinate dal codice. I dati e i documenti contenuti nel fascicolo virtuale dell’operatore economico, nei termini di\n   efficacia di ciascuno di essi, sono aggiornati automaticamente mediante interoperabilità e sono utilizzati in tute le gare\n   procedure di affidamento cui l’operatore partecipa.\n3. Le amministrazioni competenti al rilascio delle certificazioni o delle informazioni di cui all'articolo agli articoli 94 e\n    95 garantiscono alla Banca dati nazionale dei contratti pubblici, atraverso la piataforma di cui all’articolo 50-ter del\n    codice dell'a",
  },
  98: {
    title: 'Illecito professionale grave',
    text: "Art. 98. (Illecito professionale grave)\n1. L’illecito professionale grave rileva solo se compiuto dall’operatore economico offerente, salvo quanto previsto dal\n   comma 3, letere g) ed h).\n2. L’esclusione di un operatore economico ai sensi dell’articolo 95, comma 1, letera e) è disposta e comunicata dalla\n   stazione appaltante quando ricorrono tute le seguenti condizioni:\n   a) elementi sufficienti ad integrare il grave illecito professionale;\n   b) idoneità del grave illecito professionale ad incidere sull’affidabilità e integrità dell’operatore;\n   c) adeguati mezzi di prova di cui al comma 6.\n3. L’illecito professionale si può desumere al verificarsi di almeno uno dei seguenti elementi:\n   a) sanzione esecutiva irrogata dall’Autorità garante della concorrenza e del mercato o da altra autorità di settore,\n      rilevante in relazione all’oggeto specifico dell’appalto;\n   b) condota dell'operatore economico che abbia tentato di influenzare indebitamente il processo decisionale della\n      stazione appaltante o di otenere informazioni riservate a proprio vantaggio oppure che abbia fornito, anche per\n      negligenza, informazioni false o fuorvianti suscetibili di influenzare le de",
  },
  20: {
    title: 'Principi in materia di trasparenza',
    text: 'Art. 20. (Principi in materia di trasparenza)\n1. Fermi restando gli obblighi di pubblicità legale, a fini di trasparenza i dati, le informazioni e gli ati relativi ai contratti\n   pubblici sono indicati nell’articolo 28 e sono pubblicati secondo quanto stabilito dal decreto legislativo 14 marzo 2013,\n   n. 33.\n2. Le comunicazioni e l’interscambio di dati per le finalità di conoscenza e di trasparenza avvengono nel rispetto del\n   principio di unicità del luogo di pubblicazione e dell’invio delle informazioni.\n3. Le regioni e le province autonome assicurano la trasparenza nel settore dei contratti pubblici.',
  },
  33: {
    title: 'Aste elettroniche',
    text: "Art. 33. (Aste elettroniche)\n1. Le stazioni appaltanti e gli enti concedenti possono ricorrere ad aste eletroniche nelle quali sono presentati nuovi\n   prezzi, modificati al ribasso, o nuovi valori riguardanti taluni elementi delle offerte. A tal fine, le stazioni appaltanti e gli\n   enti concedenti struturano l'asta come un processo eletronico per fasi successive, che interviene dopo una prima\n   valutazione completa delle offerte e consente di classificarle sulla base di un tratamento automatico. Gli appalti di\n   servizi e di lavori che hanno per oggeto prestazioni intelletuali, come la progetazione di lavori, che non possono essere\n   classificati in base ad un tratamento automatico, non sono oggeto di aste eletroniche.\n2. Nelle procedure aperte, ristrete o competitive con negoziazione o nelle procedure negoziate precedute da un'indizione\n   di gara, le stazioni appaltanti e gli enti concedenti possono stabilire che l'aggiudicazione di un appalto sia preceduta da\n   un'asta eletronica quando il contenuto dei documenti di gara, in particolare le specifiche tecniche, può essere fissato\n   in maniera precisa. Alle stesse condizioni, essi possono ricorrere all'asta eletronica in oc",
  },
  75: {
    title: 'Partenariato per l’innovazione',
    text: "Art. 75. (Partenariato per l’innovazione)\n1. Nei documenti di gara la stazione appaltante identifica l’esigenza di prodoti, servizi o lavori innovativi che non può\n   essere soddisfata con quelli disponibili sul mercato. Indica altresì gli elementi dei prodoti, servizi o lavori innovativi\n   identificati che definiscono i requisiti minimi che tuti gli offerenti devono soddisfare. Tali informazioni sono\n   sufficientemente precise per permetere agli operatori economici di individuare la natura e l'ambito della soluzione\n   richiesta e decidere se partecipare alla procedura.\n2. Nel partenariato per l'innovazione qualsiasi operatore economico può formulare una domanda di partecipazione in\n   risposta a un bando di gara o a un avviso di indizione di gara, fornendo gli elementi richiesti dalla stazione appaltante.\n3. La stazione appaltante può decidere di instaurare il partenariato per l'innovazione con uno o più operatori economici\n   che conducono atività di ricerca e sviluppo separate. Il termine minimo per la ricezione delle domande di\n   partecipazione è di 30 trenta giorni dalla data di trasmissione del bando di gara ai sensi dell’articolo 84. Gli appalti sono\n   aggiudicati unica",
  },
  39: {
    title:
      'Programmazione e progettazione delle infrastrutture strategiche e di preminente ',
    text: 'Art. 39. (Programmazione e progettazione delle infrastrutture strategiche e di preminente interesse nazionale)\n1. Le disposizioni del presente articolo disciplinano le procedure di pianificazione, programmazione e progetazione delle\n   infrastruture strategiche la cui realizzazione riveste caratere di urgenza e di preminente interesse nazionale ai fini della\n   modernizzazione e dello sviluppo della Nazione.\n2. Il Governo qualifica una infrastrutura come strategica e di preminente interesse nazionale con delibera del Consiglio\n   dei ministri, in considerazione del rendimento infrastruturale, dei costi, degli obietivi e dei tempi di realizzazione\n   dell’opera. La qualificazione è operata su proposta dei Ministri competenti, sentite le regioni interessate, ovvero su\n   proposta delle regioni al Governo, sentiti i Ministri competenti.\n3. L’elenco delle infrastruture di cui al presente articolo è inserito nel documento di economia e finanza, con l’indicazione:\n   a) dei criteri di rendimento atesi in termini di sviluppo infrastruturale, riequilibrio socio-economico fra le aree del\n       territorio nazionale, sostenibilità ambientale, garanzia della sicurezza strategica, contenimento',
  },
  7: {
    title: 'Principio di auto-organizzazione amministrativa',
    text: 'Art. 7. (Principio di auto-organizzazione amministrativa)\n1. Le pubbliche amministrazioni organizzano autonomamente l’esecuzione di lavori o la prestazione di beni e servizi\n   atraverso l’auto-produzione, l’esternalizzazione e la cooperazione nel rispetto della disciplina del codice e del dirito\n   dell’Unione europea.\n2. Le stazioni appaltanti e gli enti concedenti possono affidare diretamente a società in house lavori, servizi o forniture,\n   nel rispetto dei principi di cui agli articoli 1, 2 e 3. Le stazioni appaltanti e gli enti concedenti adotano per ciascun\n   affidamento un provvedimento motivato in cui danno conto dei vantaggi per la colletività, delle connesse esternalità e\n   della congruità economica della prestazione, anche in relazione al perseguimento di obietivi di universalità, socialità,\n   efficienza, economicità, qualità della prestazione, celerità del procedimento e razionale impiego di risorse pubbliche. In\n   caso di prestazioni strumentali, il provvedimento si intende sufficientemente motivato qualora dia conto dei vantaggi\n   in termini di economicità, di celerità o di perseguimento di interessi strategici. I vantaggi di economicità possono\n   emergere anc',
  },
  198: {
    title: 'Altre disposizioni in materia di gara',
    text: 'Art. 198. (Altre disposizioni in materia di gara)\n1. Le proposte di cui all’articolo 193, comma 1, primo periodo, possono riguardare, in alternativa alla concessione, tuti i\n   contratti di partenariato pubblico privato.\n2. Gli operatori economici aggiudicatari di contratti di partenariato pubblico-privato possono sempre avvalersi, anche al\n   di fuori della finanza di progeto, della facoltà di costituire una società di scopo ai sensi degli articoli 194 e 195.\n3. Gli investitori istituzionali di cui all’articolo 193, comma 1, quarto periodo, anche al di fuori della finanza di progeto,\n   possono partecipare alla gara, associandosi o consorziandosi con operatori economici in possesso dei requisiti per\n   l’esecuzione dei lavori o dei servizi, qualora gli stessi ne siano privi. Gli investitori istituzionali possono soddisfare la\n   richiesta dei requisiti di caratere economico, finanziario, tecnico e professionale avvalendosi, anche integralmente,\n   delle capacità di altri soggeti. Gli investitori istituzionali possono altresì subappaltare, anche interamente, le prestazioni\n   oggeto del contratto di concessione a imprese in possesso dei requisiti richiesti dal bando, a condizione c',
  },
  115: {
    title: 'Controllo tecnico contabile e amministrativo',
    text: "Art. 115. (Controllo tecnico contabile e amministrativo)\n1. Con l’allegato II.14 sono individuate le modalità con cui il diretore dei lavori effetua l'atività di direzione, controllo e\n   contabilità dei lavori mediante le piataforme digitali di cui all’articolo 25, in modo da garantirne trasparenza e\n   semplificazione.\n2. L’esecutore dei lavori si uniforma alle disposizioni e agli ordini di servizio del diretore dei lavori senza poterne\n   sospendere o ritardare il regolare sviluppo. Le riserve sono iscrite con le modalità e nei termini previsti dall’allegato\n   II.14, a pena di decadenza dal dirito di fare valere, in qualunque tempo e modo, pretese relative ai fati e alle\n   contabilizzazioni risultanti dall’ato contabile.\n3. Nei contratti di servizi e forniture le modalità dell’atività di direzione, controllo e contabilità demandata al RUP o al\n   diretore dell’esecuzione, se nominato, sono individuate con il capitolato speciale o, in mancanza, con l’allegato II.14,\n   secondo criteri di trasparenza e semplificazione e prevedono l’uso delle piataforme digitali di cui all’articolo 25.\n4. Nei contratti di cui al comma 3 il capitolato speciale contiene anche la disciplina delle co",
  },
  32: {
    title: 'Sistemi dinamici di acquisizione',
    text: "Art. 32. (Sistemi dinamici di acquisizione)\n1. Per acquisti di uso corrente, le cui carateristiche, così come generalmente disponibili sul mercato, soddisfano le\n   esigenze delle stazioni appaltanti e degli enti concedenti, è possibile avvalersi di un sistema dinamico di acquisizione. Il\n   sistema dinamico di acquisizione è un procedimento interamente eletronico ed è aperto per tuto il periodo di efficacia\n   a qualsiasi operatore economico che soddisfi i criteri di selezione. Può essere diviso in categorie definite di prodoti,\n   lavori o servizi sulla base delle carateristiche dell'appalto da eseguire. Tali carateristiche possono comprendere un\n   riferimento al quantitativo massimo ammissibile degli appalti specifici successivi o a un'area geografica specifica in cui\n   gli appalti saranno eseguiti.\n2. Per l'aggiudicazione nell'ambito di un sistema dinamico di acquisizione, le stazioni appaltanti e gli enti concedenti\n   osservano le norme previste per la procedura ristreta di cui all'articolo 72. Tuti i candidati che soddisfano i criteri di\n   selezione sono ammessi al sistema e il numero dei candidati ammessi non può essere limitato. Le stazioni appaltanti e\n   gli enti conc",
  },
  46: {
    title: 'Concorsi di progettazione',
    text: 'Art. 46. (Concorsi di progettazione)\n1. Ai concorsi di progetazione si applica la disciplina del Capo II della diretiva 2014/24/UE del Parlamento europeo e del\n   Consiglio, del 26 febbraio 2014 e, per i setori speciali, la disciplina del Capo II della diretiva 2014/25/UE del Parlamento\n   europeo e del Consiglio, del 26 febbraio 2014.\n2. Il concorso di progetazione relativo al settore dei lavori pubblici si svolge di regola in una sola fase e ha ad oggeto\n   progeti o piani con livello di approfondimento corrispondente al progeto di fatibilità tecnica ed economica. Con\n   adeguata motivazione, le stazioni appaltanti e gli enti concedenti possono bandire un concorso in due fasi. Nella prima\n   fase sono selezionate le proposte ideative. Nella seconda fase è elaborato un progeto di fatibilità tecnica ed economica\n   delle proposte selezionate. Qualora il concorso di progetazione riguardi un intervento da affidare in concessione, la\n   proposta ideativa contiene anche la redazione di uno studio economico finanziario per la sua costruzione e gestione.\n3. Con il pagamento del premio le stazioni appaltanti e gli enti concedenti acquistano la proprietà del progeto vincitore.\n   Il bando ',
  },
  91: {
    title: 'Domande, documento di gara unico europeo, offerte',
    text: 'Art. 91. (Domande, documento di gara unico europeo, offerte)\n1. L’operatore economico che intende partecipare ad una procedura per l’aggiudicazione di un appalto utilizza la\n   piataforma di approvvigionamento digitale messa a disposizione dalla stazione appaltante per compilare i seguenti ati:\n    a) la domanda di partecipazione;\n    b) il documento di gara unico europeo;\n    c) l’offerta;\n    d) ogni altro documento richiesto per la partecipazione alla procedura di gara.\n2    La domanda di partecipazione contiene gli elementi di identificazione del concorrente e l’indicazione della forma\n    giuridica con la quale si presenta in gara, l’eventuale dichiarazione della volontà di avvalersi di impresa ausiliaria, nonché\n    l’indicazione dei dati e dei documenti relativi ai requisiti speciali di partecipazione di cui agli articoli 100 e 103 contenuti\n    nel fascicolo virtuale dell’operatore economico di cui all’articolo 24.\n3. Con il documento di gara unico europeo, redato in forma digitale in conformità al modello di formulario approvato con\n   regolamento della Commissione europea, prodoto secondo il comma 1, l’operatore economico e le imprese ausiliarie\n   dichiarano:\n    a) di e',
  },
  117: {
    title: 'Garanzie definitive',
    text: "Art. 117. (Garanzie definitive)\n1. Per la sotoscrizione del contratto l'appaltatore costituisce una garanzia, denominata \"garanzia definitiva\", a sua scelta\n    soto forma di cauzione o fideiussione con le modalità previste dall’articolo 106, pari al 10 per cento dell'importo\n    contratuale; tale obbligo è indicato negli ati e documenti di gara. Nel caso di procedure realizzate in forma aggregata\n    da centrali di commitenza, l'importo della garanzia è indicato nella misura massima del 10 per cento dell'importo\n    contratuale. Nel caso di procedure aventi ad oggeto accordi quadro di cui all’articolo 59, l'importo della garanzia per\n    tuti gli operatori economici aggiudicatari è indicato nella misura massima del 2 per cento dell'importo dell’accordo\n    quadro; l’importo della garanzia per i contratti atuativi può essere fissato nella documentazione di gara dell’accordo\n    quadro in misura anche inferiore al 10 per cento del valore dei contratti stessi con l’indicazione delle modalità di calcolo\n    della maggiorazione prevista dal comma 2.\n2. Per salvaguardare l'interesse pubblico alla conclusione del contratto nei termini e nei modi programmati in caso di\n    aggiudicazione ",
  },
  17: {
    title: 'Fasi delle procedure di affidamento',
    text: 'Art. 17. (Fasi delle procedure di affidamento)\n1. Prima dell’avvio delle procedure di affidamento dei contratti pubblici le stazioni appaltanti e gli enti concedenti, con\n   apposito ato, adotano la decisione di contrarre individuando gli elementi essenziali del contratto e i criteri di selezione\n   degli operatori economici e delle offerte.\n2. In caso di affidamento direto, l’ato di cui al comma 1 individua l’oggeto, l’importo e il contraente, unitamente alle\n   ragioni della sua scelta, ai requisiti di caratere generale e, se necessari, a quelli inerenti alla capacità economico-\n   finanziaria e tecnico-professionale.\n3. Le stazioni appaltanti e gli enti concedenti concludono le procedure di selezione nei termini indicati nell’allegato I.3. Il\n   superamento dei termini costituisce silenzio inadempimento e rileva anche al fine della verifica del rispetto del dovere\n   di buona fede, anche in pendenza di contenzioso. In sede di prima applicazione del codice, l’allegato I.3 è abrogato a\n   decorrere dalla data di entrata in vigore di un corrispondente regolamento emanato ai sensi dell’articolo 17, comma 1,\n   della legge 23 agosto 1988, n. 400, su proposta del Ministro delle infras',
  },
  101: {
    title: 'Soccorso istruttorio',
    text: 'Art. 101. (Soccorso istruttorio)\n1. Salvo che al momento della scadenza del termine per la presentazione dell’offerta il documento sia presente nel\n   fascicolo virtuale dell’operatore economico, la stazione appaltante assegna un termine non inferiore a cinque giorni e\n   non superiore a dieci giorni per:\n   a) integrare di ogni elemento mancante la documentazione trasmessa alla stazione appaltante nel termine per la\n      presentazione delle offerte con la domanda di partecipazione alla procedura di gara o con il documento di gara unico\n      europeo, con esclusione della documentazione che compone l’offerta tecnica e l’offerta economica; la mancata\n      presentazione della garanzia provvisoria, del contratto di avvalimento e dell’impegno a conferire mandato colletivo\n      speciale in caso di raggruppamenti di concorrenti non ancora costituiti è sanabile mediante documenti aventi data\n      certa anteriore al termine fissato per la presentazione delle offerte;\n   b) sanare ogni omissione, inesatezza o irregolarità della domanda di partecipazione, del documento di gara unico\n      europeo e di ogni altro documento richiesto dalla stazione appaltante per la partecipazione alla pro',
  },
  52: {
    title: 'Controllo sul possesso dei requisiti',
    text: 'Art. 52. (Controllo sul possesso dei requisiti)\n1. Nelle procedure di affidamento di cui all’articolo 50, comma 1, letere a) e b), di importo inferiore a 40.000 euro, gli\n   operatori economici atestano con dichiarazione sostitutiva di ato di notorietà il possesso dei requisiti di partecipazione\n   e di qualificazione richiesti. La stazione appaltante verifica le dichiarazioni, anche previo sorteggio di un campione\n   individuato con modalità predeterminate ogni anno.\n2. Quando in conseguenza della verifica non sia confermato il possesso dei requisiti generali o speciali dichiarati, la\n   stazione appaltante procede alla risoluzione del contratto, all’escussione della eventuale garanzia definitiva, alla\n   comunicazione all’ANAC e alla sospensione dell’operatore economico dalla partecipazione alle procedure di affidamento\n   indete dalla medesima stazione appaltante per un periodo da uno a dodici mesi decorrenti dall’adozione del\n   provvedimento.',
  },
  100: {
    title: 'Requisiti di ordine speciale',
    text: 'Art. 100. (Requisiti di ordine speciale)\n1. Sono requisiti di ordine speciale:\n   a) l’idoneità professionale;\n   b) la capacità economica e finanziaria;\n   c) le capacità tecniche e professionali.\n2. Le stazioni appaltanti richiedono requisiti di partecipazione proporzionati e atinenti all’oggeto dell’appalto.\n3. Per le procedure di aggiudicazione di appalti di servizi e forniture le stazioni appaltanti richiedono l’iscrizione nel registro\n   della camera di commercio, industria, artigianato e agricoltura o nel registro delle commissioni provinciali per\n   l’artigianato o presso i competenti ordini professionali per un’atività pertinente anche se non coincidente con l’oggeto\n   dell’appalto. All’operatore economico di altro Stato membro non residente in Italia è richiesto di dichiarare ai sensi del\n   testo unico delle disposizioni legislative e regolamentari in materia di documentazione amministrativa, di cui al decreto\n   del Presidente della Repubblica del 28 dicembre 2000, n. 445, di essere iscrito in uno dei registri professionali o\n   commerciali di cui all’allegato II.11. In sede di prima applicazione del codice, l’allegato II.11 è abrogato a decorrere dalla\n   data di entr',
  },
  217: {
    title: 'Determinazioni',
    text: 'Art. 217. (Determinazioni)\n1. Quando l’acquisizione del parere non è obbligatoria, le determinazioni del collegio consultivo tecnico assumono natura\n   di lodo contratuale ai sensi dell’articolo 808-ter del codice di procedura civile se le parti, successivamente alla nomina\n   del Presidente e non oltre il momento dell’insediamento del collegio, non abbiano diversamente disposto. La possibilità\n   che la pronuncia del CCT collegio consultivo tecnico assuma natura di lodo contratuale è esclusa nei casi in cui è\n   richiesto il parere sulla sospensione coativa e sulle modalità di prosecuzione dei lavori. Il parere obbligatorio può essere\n   sostituito dalla determinazione avente natura di lodo contratuale nell’ipotesi di sospensione imposta da gravi ragioni\n   di ordine tecnico ai sensi del comma 4 dell’articolo 216.\n2. Se le parti, ai sensi di quanto disposto dal comma 1, escludono che la pronuncia possa valere come lodo contratuale, il\n   parere, anche se facoltativo, produce comunque gli effeti di cui al comma 3 dell’articolo 215.\n3. Le determinazioni aventi natura di lodo contratuale sono impugnabili nei casi e nei modi indicati dall’articolo articolo\n   808-ter, secondo comma, d',
  },
  22: {
    title: 'Ecosistema nazionale di approvvigionamento digitale (e-procurement',
    text: 'Art. 22. (Ecosistema nazionale di approvvigionamento digitale (e-procurement))\n1. L’ecosistema nazionale di approvvigionamento digitale (e-procurement) è costituito dalle piataforme e dai servizi\n   digitali infrastruturali abilitanti la gestione del ciclo di vita dei contratti pubblici, di cui all’articolo 23 e dalle piataforme\n   di approvvigionamento digitale utilizzate dalle stazioni appaltanti di cui all’articolo 25.\n2. Le piataforme e i servizi digitali di cui al comma 1 consentono, in particolare:\n   a) la redazione o l’acquisizione degli ati in formato nativo digitale;\n   b) la pubblicazione e la trasmissione dei dati e documenti alla Banca dati nazionale dei contratti pubblici;\n   c) l’accesso eletronico alla documentazione di gara;\n   d) la presentazione del documento di gara unico europeo in formato digitale e l’interoperabilità con il fascicolo virtuale\n      dell’operatore economico;\n   e) la presentazione delle offerte;\n   f) l’apertura, la gestione e la conservazione del fascicolo di gara in modalità digitale;\n   g) il controllo tecnico, contabile e amministrativo dei contratti anche in fase di esecuzione e la gestione delle garanzie.\n3. Le basi di dati di interesse ',
  },
  31: {
    title: 'Anagrafe degli operatori economici partecipanti agli appalti',
    text: 'Art. 31. (Anagrafe degli operatori economici partecipanti agli appalti)\n1. È istituita presso l’ANAC l’Anagrafe degli operatori economici a qualunque titolo coinvolti nei contratti pubblici, che si\n   avvale del registro delle imprese.\n2. L’Anagrafe censisce gli operatori economici di cui al comma 1, nonché i soggeti, le persone fisiche e i titolari di cariche\n   ad essi riferibili.\n3. Per le persone fisiche di cui al comma 2 l’Anagrafe assume valore certificativo per i ruoli e le cariche rivestiti non risultanti\n   dal registro delle imprese.\n4. I dati dell’Anagrafe sono resi disponibili a tuti i soggeti operanti nell’ambito dell’ecosistema nazionale di\n   approvvigionamento digitale, atraverso le piataforme di cui agli articoli 23, 24 e 25, per i tratamenti e le finalità legati\n   alla gestione del ciclo di vita dei contratti pubblici.',
  },
  96: {
    title: 'Disciplina dell’esclusione',
    text: 'Art. 96. (Disciplina dell’esclusione)\n1. Salvo quanto previsto dai commi 2, 3, 4, 5 e 6, le stazioni appaltanti escludono un operatore economico in qualunque\n   momento della procedura d’appalto, qualora risulti che questi si trovi, a causa di ati compiuti od omessi prima o nel\n   corso della procedura, in una delle situazioni di cui agli articoli 94 e 95.\n2. L’operatore economico che si trovi in una delle situazioni di cui all’articolo 94, a eccezione del comma 6, e all’articolo\n   95, a eccezione del comma 2, non è escluso se si sono verificate le condizioni di cui al comma 6 del presente articolo e\n   ha adempiuto agli oneri di cui ai commi 3 o 4 del presente articolo.\n3. Se la causa di esclusione si è verificata prima della presentazione dell’offerta, l’operatore economico, contestualmente\n    all’offerta, la comunica alla stazione appaltante e, alternativamente:\n   a) comprova di avere adotato le misure di cui al comma 6;\n   b) comprova l’impossibilità di adotare tali misure prima della presentazione dell’offerta e successivamente otempera\n      ai sensi del comma 4.\n4. Se la causa di esclusione si è verificata successivamente alla presentazione dell’offerta, l’operatore econo',
  },
  123: {
    title: 'Recesso',
    text: "Art. 123. (Recesso)\n1. Fermo restando quanto previsto dagli articoli 88, comma 4-ter e 92, comma 4, del codice delle leggi antimafia e delle\n   misure di prevenzione, di cui al decreto legislativo 6 setembre 2011, n. 159, la stazione appaltante può recedere dal\n   contratto in qualunque momento purché tenga indenne l’appaltatore mediante il pagamento dei lavori eseguiti o delle\n   prestazioni relative ai servizi e alle forniture eseguiti nonché del valore dei materiali utili esistenti in cantiere nel caso di\n   lavori o in magazzino nel caso di servizi o forniture, oltre al decimo dell'importo delle opere, dei servizi o delle forniture\n   non eseguite, calcolato secondo quanto previsto dell’allegato II.14.\n2. L'esercizio del dirito di recesso è manifestato dalla stazione appaltante mediante una formale comunicazione\n   all'appaltatore da darsi per iscrito con un preavviso non inferiore a venti giorni, decorsi i quali la stazione appaltante\n   prende in consegna i lavori, servizi o forniture ed effetua il collaudo definitivo o verifica la regolarità dei servizi e delle\n   forniture.\n3. L’allegato II.14 disciplina il rimborso dei materiali, la facoltà di ritenzione della stazione app",
  },
  12: {
    title: 'Rinvio esterno',
    text: 'Art. 12. (Rinvio esterno)\n1. Per quanto non espressamente previsto nel codice:\n   a) alle procedure di affidamento e alle altre atività amministrative in materia di contratti si applicano le disposizioni di\n      cui alla legge 7 agosto 1990, n. 241;\n   b) alla stipula del contratto e alla fase di esecuzione si applicano le disposizioni del codice civile.\n\nTitolo II - L’ambito di applicazione, il responsabile unico e le fasi dell’affidamento.',
  },
  15: {
    title: 'Responsabile unico del progetto (RUP',
    text: 'Art. 15. (Responsabile unico del progetto (RUP))\n1. Nel primo ato di avvio dell’intervento pubblico da realizzare mediante un contratto le stazioni appaltanti e gli enti\n   concedenti nominano nell’interesse proprio o di altre amministrazioni un responsabile unico del progeto (RUP) per le\n   fasi di programmazione, progetazione, affidamento e per l’esecuzione di ciascuna procedura soggeta al codice.\n2. Le stazioni appaltanti e gli enti concedenti nominano il RUP tra i dipendenti assunti anche a tempo determinato della\n    stazione appaltante o dell’ente concedente, preferibilmente in servizio presso l’unità organizzativa titolare del potere di\n    spesa, in possesso dei requisiti di cui all’allegato I.2 e di competenze professionali adeguate in relazione ai compiti al\n    medesimo affidati, nel rispetto dell’inquadramento contratuale e delle relative mansioni. Le stazioni appaltanti e gli\n    enti concedenti che non sono pubbliche amministrazioni o enti pubblici individuano, secondo i propri ordinamenti, uno\n    o più soggeti cui affidare i compiti del RUP, limitatamente al rispetto delle norme del codice alla cui osservanza sono\n    tenute. L’ufficio di RUP è obbligatorio e non pu',
  },
  47: {
    title: 'Consiglio superiore dei lavori pubblici',
    text: "Art. 47. (Consiglio superiore dei lavori pubblici)\n1. Il Consiglio superiore dei lavori pubblici è il massimo organo tecnico consultivo dello Stato; opera con indipendenza di\n   giudizio e di valutazione ed è dotato di piena autonomia funzionale e organizzativa.\n2. Il Consiglio superiore dei lavori pubblici è presieduto dal Presidente ed è costituito dall’Assemblea generale, da quatro\n   Sezioni, dalla Segreteria generale, dal Servizio tecnico centrale e dall’Osservatorio del collegio consultivo tecnico.\n3. Il Consiglio superiore dei lavori pubblici, nell'ambito dei compiti atribuiti allo Stato e nel rispetto delle prerogative delle\n   regioni, delle province autonome, delle province, delle cità metropolitane e dei comuni, esercita funzioni consultive ed\n   esprime pareri obbligatori esclusivamente sui progeti di fatibilità tecnica ed economica di competenza statale, dei\n   concessionari statali e sulle altre opere finanziate per almeno il 50 per cento dallo Stato; e pareri facoltativi sui\n   documenti di fatibilità delle alternative progetuali inseriti nei documenti pluriennali di programmazione dei ministeri\n   competenti. I pareri di cui al primo periodo sono resi se il costo co",
  },
  53: {
    title: 'Garanzie a corredo dell’offerta e garanzie definitive',
    text: 'Art. 53. (Garanzie a corredo dell’offerta e garanzie definitive)\n1. Nelle procedure di affidamento di cui all’articolo 50, comma 1, la stazione appaltante non richiede le garanzie\n   provvisorie di cui all’articolo 106 salvo che, nelle procedure di cui alle letere c), d) ed e) dello stesso comma 1\n   dell’articolo 50, in considerazione della tipologia e specificità della singola procedura, ricorrano particolari esigenze che\n   ne giustifichino la richiesta. Le esigenze particolari sono indicate nella decisione di contrarre oppure nell’avviso di\n   indizione della procedura o in altro ato equivalente.\n2. Quando è richiesta la garanzia provvisoria, il relativo ammontare non può superare l’uno per cento dell’importo previsto\n   nell’avviso o nell’invito per il contratto oggeto di affidamento.\n3. La garanzia provvisoria può essere costituita soto forma di cauzione oppure di fideiussione con le modalità di cui\n   all’articolo 106.\n4. In casi debitamente motivati è facoltà della stazione appaltante non richiedere la garanzia definitiva per l’esecuzione\n   dei contratti di cui alla presente Parte oppure per i contratti di pari importo a valere su un accordo quadro. Quando\n   richiesta, la',
  },
  36: {
    title: 'Norme procedimentali e processuali in tema di accesso',
    text: 'Art. 36. (Norme procedimentali e processuali in tema di accesso)\n1. L’offerta dell’operatore economico risultato aggiudicatario, i verbali di gara e gli ati, i dati e le informazioni presupposti\n    all’aggiudicazione sono resi disponibili, atraverso la piataforma di approvvigionamento digitale di cui all’articolo 25\n    utilizzata dalla stazione appaltante o dall’ente concedente, a tuti i candidati e offerenti non definitivamente esclusi\n    contestualmente alla comunicazione digitale dell’aggiudicazione ai sensi dell’articolo 90.\n2. Agli operatori economici collocatisi nei primi cinque posti in graduatoria sono resi reciprocamente disponibili, atraverso\n   la stessa piataforma, gli ati di cui al comma 1, nonché le offerte dagli stessi presentate.\n3. Nella comunicazione dell’aggiudicazione di cui al comma 1, la stazione appaltante o l’ente concedente dà anche ato\n   delle decisioni assunte sulle eventuali richieste di oscuramento di parti delle offerte di cui ai commi 1 e 2, indicate dagli\n   operatori ai sensi dell’articolo 35, comma 4, letera a).\n4. Le decisioni di cui al comma 3 sono impugnabili ai sensi dell’articolo 116 del codice del processo amministrativo, di cui\n   all’al',
  },
  2: {
    title: 'Principio della fiducia',
    text: 'Art. 2. (Principio della fiducia)\n1 L’atribuzione e l’esercizio del potere nel settore dei contratti pubblici si fonda sul principio della reciproca fiducia\n  nell’azione legitima, trasparente e corretta dell’amministrazione, dei suoi funzionari e degli operatori economici.\n2. Il principio della fiducia favorisce e valorizza l’iniziativa e l’autonomia decisionale dei funzionari pubblici, con particolare\n   riferimento alle valutazioni e alle scelte per l’acquisizione e l’esecuzione delle prestazioni secondo il principio del\n   risultato.\n3. Nell’ambito delle atività svolte nelle fasi di programmazione, progetazione, affidamento ed esecuzione dei contratti,\n   ai fini della responsabilità amministrativa costituisce colpa grave la violazione di norme di dirito e degli auto-vincoli\n   amministrativi, nonché la palese violazione di regole di prudenza, perizia e diligenza e l’omissione delle cautele, verifiche\n   ed informazioni preventive normalmente richieste nell’atività amministrativa, in quanto esigibili nei confronti\n   dell’agente pubblico in base alle specifiche competenze e in relazione al caso concreto. Non costituisce colpa grave la\n   violazione o l’omissione determinata dal',
  },
  97: {
    title: 'Cause di esclusione di partecipanti a raggruppamenti',
    text: 'Art. 97. (Cause di esclusione di partecipanti a raggruppamenti)\n1. Fermo restando quanto previsto dall’articolo 96, commi 2, 3, 4, 5 e 6, il raggruppamento non è escluso qualora un suo\n   partecipante sia interessato da una causa automatica o non automatica di esclusione o dal venir meno di un requisito\n   di qualificazione, se si sono verificate le condizioni di cui al comma 2 e ha adempiuto ai seguenti oneri:\n   a) in sede di presentazione dell’offerta:\n   1) ha comunicato alla stazione appaltante la causa escludente verificatasi prima della presentazione dell’offerta e il\n      venir meno, prima della presentazione dell’offerta, del requisito di qualificazione, nonché il soggeto che ne è\n      interessato;\n   2) ha comprovato le misure adotate ai sensi del comma 2 o l’impossibilità di adotarle prima di quella data;\n   b) ha adotato e comunicato le misure di cui al comma 2 prima dell’aggiudicazione, se la causa escludente si è verificata\n      successivamente alla presentazione dell’offerta o il requisito di qualificazione è venuto meno successivamente alla\n      presentazione dell’offerta.\n2. Fermo restando l’articolo 96, se un partecipante al raggruppamento si trova in una dell',
  },
  99: {
    title: 'Verifica del possesso dei requisiti',
    text: "Art. 99. (Verifica del possesso dei requisiti)\n1. La stazione appaltante verifica l’assenza di cause di esclusione automatiche di cui all’articolo 94 atraverso la\n   consultazione del fascicolo virtuale dell’operatore economico di cui all’articolo 24, la consultazione degli altri documenti\n   allegati dall’operatore economico, nonché tramite l’interoperabilità con la piataforma digitale nazionale dati di cui\n   all’articolo 50-ter del codice dell'amministrazione digitale, di cui al decreto legislativo 7 marzo 2005, n. 82 e con le\n   banche dati delle pubbliche amministrazioni.\n2. La stazione appaltante, con le medesime modalità di cui al comma 1, verifica l’assenza delle cause di esclusione non\n   automatica di cui all’articolo 95, e il possesso dei requisiti di partecipazione di cui agli articoli 100 e 103.\n3. Agli operatori economici non possono essere richiesti documenti che comprovano il possesso dei requisiti di\n   partecipazione o altra documentazione utile ai fini dell’aggiudicazione, se questi sono presenti nel fascicolo virtuale\n   dell’operatore economico, sono già in possesso della stazione appaltante, per effeto di una precedente aggiudicazione\n   o conclusione di un ac",
  },
  221: {
    title:
      'Indirizzo, coordinamento e monitoraggio presso la Cabina di regia. Governance de',
    text: 'Art. 221. (Indirizzo, coordinamento e monitoraggio presso la Cabina di regia. Governance dei servizi)\n1. La Cabina di regia per il codice dei contratti pubblici è istituita presso la Presidenza del Consiglio dei ministri. La sua\n   composizione e le modalità di funzionamento sono disciplinate dall’allegato V.3. In sede di prima applicazione del\n   codice, l’allegato V.3 è abrogato a decorrere dalla data di entrata in vigore di un corrispondente regolamento adotato\n   ai sensi dell’articolo 17, comma 3, della legge 23 agosto 1988, n. 400, con decreto del Presidente del Consiglio dei\n   ministri, di concerto con il Ministro delle infrastruture e dei trasporti, sentita l’ANAC e la Conferenza unificata, che lo\n   sostituisce integralmente anche in qualità di allegato al codice.\n2. La Cabina di regia è la sede istituzionale per il coordinamento nell’attuazione del codice, per l’analisi delle proposte di\n   modifica legislativa e regolamentare, per l’indirizzo delle stazioni appaltanti, per la condivisione delle informazioni, e\n   per la diffusione della conoscenza delle migliori e delle peggiori pratiche.\n3. Ciascuna amministrazione coinvolta nell’applicazione del codice trae dall’azion',
  },
  3: {
    title: 'Principio dell’accesso al mercato',
    text: 'Art. 3. (Principio dell’accesso al mercato)\n1. Le stazioni appaltanti e gli enti concedenti favoriscono, secondo le modalità indicate dal codice, l’accesso al mercato degli\n    operatori economici nel rispetto dei principi di concorrenza, di imparzialità, di non discriminazione, di pubblicità e\n    trasparenza, di proporzionalità.',
  },
  45: {
    title: 'Incentivi alle funzioni tecniche',
    text: "Art. 45. (Incentivi alle funzioni tecniche)\n1. Gli oneri relativi alle atività tecniche indicate nell’allegato I.10 sono a carico degli stanziamenti previsti per le singole\n   procedure di affidamento di lavori, servizi e forniture negli stati di previsione della spesa o nei bilanci delle stazioni\n   appaltanti e degli enti concedenti. In sede di prima applicazione del codice, l’allegato I.10 è abrogato a decorrere dalla\n   data di entrata in vigore di un corrispondente regolamento adotato ai sensi dell’articolo 17, comma 3, della legge 23\n   agosto 1988, n. 400, con decreto del Ministero delle infrastruture e dei trasporti, sentito il Consiglio superiore dei lavori\n   pubblici, che lo sostituisce integralmente anche in qualità di allegato al codice.\n2. Le stazioni appaltanti e gli enti concedenti destinano risorse finanziarie per le funzioni tecniche svolte dai dipendenti\n   specificate nell’allegato I.10 e per le finalità indicate al comma 5, a valere sugli stanziamenti di cui al comma 1, in misura\n   non superiore al 2 per cento dell'importo dei lavori, dei servizi e delle forniture, posto a base delle procedure di\n   affidamento. Il presente comma si applica anche agli appalti ",
  },
  122: {
    title: 'Risoluzione',
    text: "Art. 122. (Risoluzione)\n1. Fato salvo quanto previsto dall'articolo 121, le stazioni appaltanti possono risolvere un contratto di appalto senza limiti\n   di tempo, se si verificano una o più delle seguenti condizioni:\n   a) modifica sostanziale del contratto, che richiede una nuova procedura di appalto ai sensi dell’articolo 120;\n   b) con riferimento alle modificazioni di cui all’articolo 120, comma 1, letere b) e c), superamento delle soglie di cui al\n       comma 2 del predeto articolo 120 e, con riferimento alle modificazioni di cui all’articolo 120, comma 3,\n       superamento delle soglie di cui al medesimo articolo 120, comma 3, letere a) e b);\n   c) l’aggiudicatario si è trovato, al momento dell'aggiudicazione dell'appalto, in una delle situazioni di cui all'articolo 94,\n      comma 1, e avrebbe dovuto pertanto essere escluso dalla procedura di gara;\n   d) l'appalto non avrebbe dovuto essere aggiudicato in considerazione di una grave violazione degli obblighi derivanti\n      dai tratati, come riconosciuto dalla Corte di giustizia dell'Unione europea in un procedimento ai sensi dell'articolo\n      258 del Tratato sul funzionamento dell'Unione europea.\n2. Le stazioni appaltan",
  },
  1: {
    title: 'Principio del risultato',
    text: 'Art. 1. (Principio del risultato)\n1. Le stazioni appaltanti e gli enti concedenti perseguono il risultato dell’affidamento del contratto e della sua esecuzione\n   con la massima tempestività e il migliore rapporto possibile tra qualità e prezzo, nel rispetto dei principi di legalità,\n   trasparenza e concorrenza.\n2. La concorrenza tra gli operatori economici è funzionale a conseguire il miglior risultato possibile nell’affidare ed eseguire\n   i contratti. La trasparenza è funzionale alla massima semplicità e celerità nella corretta applicazione delle regole del\n   presente decreto, di seguito denominato «codice» e ne assicura la piena verificabilità.\n3. Il principio del risultato costituisce attuazione, nel settore dei contratti pubblici, del principio del buon andamento e dei\n   correlati principi di efficienza, efficacia ed economicità. Esso è perseguito nell’interesse della comunità e per il\n   raggiungimento degli obietivi dell’Unione europea.\n4. Il principio del risultato costituisce criterio prioritario per l’esercizio del potere discrezionale e per l’individuazione della\n   regola del caso concreto, nonché per:\n   a) valutare la responsabilità del personale che svolge funzio',
  },
  76: {
    title: 'Procedura negoziata senza pubblicazione di un bando',
    text: "Art. 76. (Procedura negoziata senza pubblicazione di un bando)\n1. Le stazioni appaltanti possono aggiudicare appalti pubblici mediante una procedura negoziata senza pubblicazione di\n   un bando di gara quando ricorrono i presupposti fissati dai commi seguenti, dandone motivatamente conto nel primo\n   ato della procedura in relazione alla specifica situazione di fato e alle carateristiche dei mercati potenzialmente\n   interessati e delle dinamiche che li caraterizzano, e nel rispetto dei principi di cui agli articoli 1, 2 e 3. A tali fini le stazioni\n   appaltanti tengono conto degli esiti delle consultazioni di mercato eventualmente eseguite, rivolte anche ad analizzare\n   i mercati europei oppure, se del caso, extraeuropei.\n2. Le stazioni appaltanti possono ricorrere a una procedura negoziata senza pubblicazione di un bando nei seguenti casi:\n   a) quando non sia stata presentata alcuna offerta o alcuna offerta appropriata, né alcuna domanda di partecipazione\n      o alcuna domanda di partecipazione appropriata, in esito all'esperimento di una procedura aperta o ristreta, purché\n      le condizioni iniziali dell'appalto non siano sostanzialmente modificate e purché sia trasmessa u",
  },
  10: {
    title:
      'Principi di tassatività delle cause di esclusione e di massima partecipazione',
    text: 'Art. 10. (Principi di tassatività delle cause di esclusione e di massima partecipazione)\n1 I contratti pubblici non sono affidati agli operatori economici nei confronti dei quali sia stata accertata la sussistenza di\n  cause di esclusione espressamente definite dal codice.\n2. Le cause di esclusione di cui agli articoli 94 e 95 sono tassative e integrano di dirito i bandi e le letere di invito; le\n   clausole che prevedono cause ulteriori di esclusione sono nulle e si considerano non apposte.\n3. Fermi i necessari requisiti di abilitazione all’esercizio dell’atività professionale, le stazioni appaltanti e gli enti concedenti\n   possono introdurre requisiti speciali, di caratere economico-finanziario e tecnico-professionale, atinenti e\n   proporzionati all’oggeto del contratto, tenendo presente l’interesse pubblico al più ampio numero di potenziali\n   concorrenti e favorendo, purché sia compatibile con le prestazioni da acquisire e con l’esigenza di realizzare economie\n   di scala funzionali alla riduzione della spesa pubblica, l’accesso al mercato e la possibilità di crescita delle micro, piccole\n   e medie imprese.',
  },
  71: {
    title: 'Procedura aperta',
    text: "Art. 71. (Procedura aperta)\n1. Nelle procedure aperte qualsiasi operatore economico interessato può presentare un'offerta in risposta a un avviso di\n   indizione di gara.\n2. Il termine minimo per la ricezione delle offerte è di trenta giorni dalla data di trasmissione del bando di gara ai sensi\n   dell’articolo 84. Le offerte sono accompagnate dalle informazioni richieste dalla stazione appaltante.\n3. Le stazioni appaltanti possono fissare un termine non inferiore a quindici giorni a decorrere dalla data di trasmissione\n   del bando di gara ai sensi dell’articolo 84, se per ragioni di urgenza, specificamente motivate, il termine minimo stabilito\n   dal comma 2 del presente articolo non può essere rispetato.\n4. Nel caso in cui le stazioni appaltanti abbiano pubblicato un avviso di pre-informazione di cui all’articolo 81 che non sia\n   stato usato come mezzo di indizione di una gara, il termine minimo di cui al comma 2 del presente articolo può essere\n   ridoto a quindici giorni purché concorrano le seguenti condizioni:\n   a) l'avviso di pre-informazione contenga tute le informazioni richieste per il bando di gara di cui all'allegato II.6, Parte\n      I, letera B, sezione B.1, sempre",
  },
  142: {
    title: 'Joint venture e affidamenti a imprese collegate',
    text: 'Art. 142. (Joint venture e affidamenti a imprese collegate)\n1. Le disposizioni del codice non si applicano, quando ricorrano le condizioni di cui al comma 3, ai contratti aggiudicati:\n   a) da una joint venture, composta esclusivamente da più stazioni appaltanti o enti concedenti per svolgere una o più\n      delle atività di cui agli articoli da 146 a 152 e all’Allegato II alla diretiva 2014/23/UE del Parlamento europeo e del\n      Consiglio, del 26 febbraio 2014, a una di tali stazioni appaltanti o enti concedenti;\n   b) da una stazione appaltante o ente concedente alla joint venture di cui fa parte.\n2. Le disposizioni del codice non si applicano, altresì, se ricorrono le condizioni di cui al comma 4, ai contratti aggiudicati:\n   a) da una stazione appaltante o ente concedente a un’impresa collegata;\n   b) da una joint venture, composta esclusivamente da più stazioni appaltanti o enti concedenti per svolgere le atività\n      di cui agli articoli da 146 a 152, a un’impresa collegata a una di tali stazioni appaltanti o enti concedenti.\n3. La non applicabilità di cui al comma 1 opera a condizione che la joint venture sia stata costituita per lo svolgimento delle\n   atività oggeto di ',
  },
  29: {
    title: 'Regole applicabili alle comunicazioni',
    text: 'Art. 29. (Regole applicabili alle comunicazioni)\n1. Tute le comunicazioni e gli scambi di informazioni di cui al codice sono eseguiti, in conformità con quanto disposto dal\n   codice dell’amministrazione digitale di cui al decreto legislativo 7 marzo 2005, n. 82, tramite le piataforme\n   dell’ecosistema nazionale di cui all’articolo 22 del presente codice e, per quanto non previsto dalle predete piataforme,\n   mediante l’utilizzo del domicilio digitale ovvero, per le comunicazioni tra pubbliche amministrazioni, ai sensi dell’articolo\n   47 del codice dell’amministrazione digitale di cui al decreto legislativo n. 82 del 2005.',
  },
  176: {
    title: 'Oggetto e ambito di applicazione',
    text: 'Art. 176. (Oggetto e ambito di applicazione)\n1. La presente Parte disciplina le procedure di aggiudicazione dei contratti di concessione indete da enti concedenti e la\n   relativa esecuzione.\n2. Alle concessioni di servizi economici d’interesse generale si applicano le norme della presente Parte, ferme restando le\n   specifiche esclusioni previste dal codice. Per i profili non disciplinati si applica il decreto legislativo 23 dicembre 2022,\n   n. 201, nonché le altre norme speciali di settore.',
  },
  215: {
    title: 'Collegio consultivo tecnico',
    text: "Art. 215. (Collegio consultivo tecnico)\n1. Per prevenire le controversie o consentire la rapida risoluzione delle stesse o delle dispute tecniche di ogni natura che\n   possano insorgere nell'esecuzione dei contratti, ciascuna parte può chiedere la costituzione di un collegio consultivo\n   tecnico (CCT), formato secondo le modalità di cui all’allegato V.2. Per i lavori direti alla realizzazione delle opere\n   pubbliche di importo pari o superiore alle soglie di rilevanza europea e di forniture e servizi di importo pari o superiore\n   a 1 milione di euro, la costituzione del collegio è obbligatoria. In sede di prima applicazione del codice, l’allegato V.2 è\n   abrogato a decorrere dalla data di entrata in vigore di un corrispondente regolamento adotato ai sensi dell’articolo 17,\n   comma 3, della legge 23 agosto 1988, n. 400, con decreto del Ministro delle infrastruture e dei trasporti, sentito il\n   Consiglio superiore dei lavori pubblici, che lo sostituisce integralmente anche in qualità di allegato al codice.\n2. Il collegio consultivo tecnico esprime pareri o, in assenza di una espressa volontà contraria, adota determinazioni aventi\n   natura di lodo contratuale ai sensi dell'arti",
  },
  42: {
    title: 'Verifica della progettazione',
    text: "Art. 42. (Verifica della progettazione)\n1. Nei contratti relativi ai lavori la stazione appaltante e l’ente concedente verificano la rispondenza del progeto alle\n   esigenze espresse nel documento d’indirizzo e la sua conformità alla normativa vigente. La verifica ha luogo durante lo\n   sviluppo della progetazione in relazione allo specifico livello previsto per l’appalto. In caso di affidamento congiunto di\n   progetazione ed esecuzione, nonché nei contratti di partenariato pubblico-privato, la verifica del progeto di fatibilità\n   tecnico-economica è completata prima dell’avvio della procedura di affidamento e la verifica del progeto esecutivo\n   redato dall’aggiudicatario è effetuata prima dell'inizio dei lavori.\n2. Per accertare la coerenza del progeto nelle sue diverse fasi con il documento di indirizzo della progetazione, il RUP, se\n    non effetua personalmente la verifica, ne segue lo sviluppo parallelamente alla progetazione, garantendo il\n    contradditorio tra il soggeto che esegue la verifica e il progetista. L’atività di verifica è incompatibile, per uno stesso\n    progeto, con le atività di progetazione, di coordinamento della relativa sicurezza, di direzione dei lavo",
  },
  211: {
    title: 'Accordo bonario per i servizi e le forniture',
    text: "Art. 211. (Accordo bonario per i servizi e le forniture)\n1. Le disposizioni dell'articolo 210 si applicano, in quanto compatibili, anche ai contratti di servizi e di fornitura continuativa\n   o periodica di beni, quando insorgano controversie circa l'esata esecuzione delle prestazioni dovute.",
  },
  113: {
    title: 'Requisiti per l’esecuzione dell’appalto',
    text: "Art. 113. (Requisiti per l’esecuzione dell’appalto)\n1. Le stazioni appaltanti possono richiedere requisiti particolari per l'esecuzione del contratto, purché siano compatibili\n   con il dirito europeo e con i principi di parità di tratamento, non discriminazione, trasparenza, proporzionalità,\n   innovazione e siano precisati nel bando di gara, o nell'invito in caso di procedure senza bando o nel capitolato d'oneri.\n   Dete condizioni possono atenere, in particolare, a esigenze sociali e ambientali.\n2. In sede di offerta gli operatori economici dichiarano di accetare i requisiti particolari nell'ipotesi in cui risulteranno\n   aggiudicatari.",
  },
  212: {
    title: 'Transazione',
    text: "Art. 212. (Transazione)\n1. Le controversie relative a diriti soggetivi derivanti dall'esecuzione dei contratti pubblici di lavori, servizi e forniture\n   possono essere risolte mediante transazione nel rispetto del codice civile solo ed esclusivamente nell'ipotesi in cui non\n   risulti possibile esperire altri rimedi alternativi all'azione giurisdizionale.\n2. Ove il valore dell'importo oggeto di concessione o rinuncia sia superiore a 100.000 euro, ovvero a 200.000 euro in caso\n   di lavori pubblici, è acquisito, qualora si trati di amministrazioni centrali, il parere dell'Avvocatura dello Stato oppure,\n   qualora si trati di amministrazioni sub centrali, di un legale interno alla strutura o, in mancanza di legale interno, del\n   funzionario più elevato in grado competente per il contenzioso.\n3. La proposta di transazione può essere formulata sia dal soggeto aggiudicatario che dal dirigente competente, sentito il\n   RUP.\n4. La transazione ha forma scrita a pena di nullità.",
  },
  226: {
    title: 'Abrogazioni e disposizioni finali',
    text: 'Art. 226. (Abrogazioni e disposizioni finali)\n1. Il decreto legislativo 18 aprile 2016, n. 50 del 2016, è abrogato dal 1° luglio 2023.\n2. A decorrere dalla data in cui il codice acquista efficacia ai sensi dell’articolo 229, comma 2, le disposizioni di cui al decreto\n   legislativo n. 50 del 2016 continuano ad applicarsi esclusivamente ai procedimenti in corso. A tal fine, per procedimenti\n   in corso si intendono:\n   a) le procedure e i contratti per i quali i bandi o avvisi con cui si indice la procedura di scelta del contraente siano stati\n      pubblicati prima della data in cui il codice acquista efficacia;\n   b) in caso di contratti senza pubblicazione di bandi o avvisi, le procedure e i contratti in relazione ai quali, alla data in\n      cui il codice acquista efficacia, siano stati già inviati gli avvisi a presentare le offerte;\n   c) per le opere di urbanizzazione a scomputo del contributo di costruzione, oggeto di convenzioni urbanistiche o ati\n      assimilati comunque denominati, i procedimenti in cui le predete convenzioni o ati siano stati stipulati prima della\n      data in cui il codice acquista efficacia;\n   d) per le procedure di accordo bonario di cui agli artico',
  },
  196: {
    title: 'Definizione e disciplina',
    text: 'Art. 196. (Definizione e disciplina)\n1. Per finanziare la realizzazione, l’acquisizione e il completamento di opere pubbliche o di pubblica utilità gli enti\n   concedenti possono stipulare contratti di locazione finanziaria (leasing).\n2. La società di locazione finanziaria acquista da un operatore economico un bene esistente o da realizzare e lo cede in\n   godimento, per un determinato periodo di tempo, alla pubblica amministrazione a fronte del pagamento di un canone\n   periodico fisso e comprensivo di eventuali servizi accessori.\n3. Se lo schema di contratto prevede il trasferimento del rischio operativo, ai sensi dell’articolo 177, si applicano, per\n   quanto non previsto dal presente articolo, le norme sulle concessioni e sugli altri contratti di partenariato pubblico-\n   privato. In caso contrario si applicano le disposizioni in materia di appalto pubblico di lavori.\n4. Per l’aggiudicazione del contratto di cui al comma 1 l’ente concedente pone a base di gara almeno un progeto di\n   fatibilità, comprensivo del piano finanziario. L’aggiudicatario predispone i successivi livelli progetuali ed esegue l’opera.\n5. Se l’offerente è un raggruppamento temporaneo di imprese costituito ',
  },
};

// ────────────────────────────────────────────────────────────────────────────
// MAPPING DI CONVERSIONE
// ────────────────────────────────────────────────────────────────────────────
const MAPPING = [
  {
    old: '1',
    oldTitle: 'Oggetto e ambito di applicazione',
    newArts: ['13'],
    newTitle: 'Ambito di applicazione',
    tema: 'Ambito',
    descrizione:
      'Disciplina i contratti di appalto e concessione delle PA per acquisizione di servizi, forniture, lavori e concorsi di progettazione.',
    commi2016: '1-3',
    commi2023: '1-4',
  },
  {
    old: '2',
    oldTitle: 'Competenze legislative Stato, regioni e province autonome',
    newArts: [''],
    newTitle: 'Abrogato (competenze costituzionali)',
    tema: 'Ambito',
    descrizione:
      'Riparto competenze legislative Stato/Regioni in materia di appalti.',
    commi2016: '1-4',
    commi2023: '\u2014',
  },
  {
    old: '3',
    oldTitle: 'Definizioni',
    newArts: ['All. I.1'],
    newTitle: 'Allegato I.1 \u2013 Definizioni',
    tema: 'Definizioni',
    descrizione:
      "Tutte le definizioni (SA, OE, appalto, concessione) migrate nell'Allegato I.1.",
    commi2016: '1',
    commi2023: 'All. I.1',
  },
  {
    old: '4',
    oldTitle: "Principi relativi all'affidamento di contratti pubblici esclusi",
    newArts: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    newTitle: 'Principi generali (Artt. 1-12)',
    tema: 'Principi',
    descrizione:
      'I principi del risultato, fiducia, accesso, buona fede, solidariet\u00e0, autonomia, conservazione equilibrio, tassativit\u00e0 e CCNL sono ora articoli autonomi.',
    commi2016: '1-2',
    commi2023: 'Artt. 1-12',
  },
  {
    old: '5',
    oldTitle: 'Principi comuni in materia di esclusione',
    newArts: ['10'],
    newTitle: 'Principi di tassativit\u00e0 delle cause di esclusione',
    tema: 'Principi',
    descrizione: 'Cause di esclusione tassative e massima apertura al mercato.',
    commi2016: '1-2',
    commi2023: '1-3',
  },
  {
    old: '7',
    oldTitle: 'Appalti e concessioni aggiudicati ad impresa collegata',
    newArts: ['7'],
    newTitle: 'Principio di auto-organizzazione amministrativa',
    tema: 'Principi',
    descrizione:
      'Gli affidamenti tra enti collegati e in house rientrano nel principio di auto-organizzazione.',
    commi2016: '1-3',
    commi2023: '1-4',
  },
  {
    old: '8',
    oldTitle:
      'Esclusione di attivit\u00e0 direttamente esposte alla concorrenza',
    newArts: ['143'],
    newTitle:
      'Attivit\u00e0 esposte direttamente alla concorrenza (settori speciali)',
    tema: 'Settori speciali',
    descrizione:
      'Esclusione di attivit\u00e0 in concorrenza nei settori speciali.',
    commi2016: '1-3',
    commi2023: '1-3',
  },
  {
    old: '9',
    oldTitle:
      'Contratti di servizi aggiudicati in base ad un diritto esclusivo',
    newArts: ['56'],
    newTitle: 'Appalti esclusi nei settori ordinari',
    tema: 'Ambito',
    descrizione: 'Contratti esclusi per diritto esclusivo o speciale.',
    commi2016: '1',
    commi2023: '1',
  },
  {
    old: '10',
    oldTitle:
      'Contratti nel settore acqua, energia, trasporti e servizi postali',
    newArts: ['141'],
    newTitle: 'Ambito e norme applicabili (settori speciali)',
    tema: 'Settori speciali',
    descrizione:
      'Settori speciali disciplinati nel Libro III del nuovo codice.',
    commi2016: '1-3',
    commi2023: '1-4',
  },
  {
    old: '12',
    oldTitle: 'Esclusioni specifiche per le concessioni nel settore idrico',
    newArts: ['181'],
    newTitle: 'Contratti esclusi (concessioni)',
    tema: 'Concessioni',
    descrizione: 'Esclusioni specifiche per determinate concessioni.',
    commi2016: '1-2',
    commi2023: '1-3',
  },
  {
    old: '13',
    oldTitle: 'Appalti nei settori speciali aggiudicati a scopo di rivendita',
    newArts: ['144'],
    newTitle: 'Appalti aggiudicati a scopo di rivendita o locazione a terzi',
    tema: 'Settori speciali',
    descrizione: 'Esclusione di appalti per rivendita nei settori speciali.',
    commi2016: '1-2',
    commi2023: '1-2',
  },
  {
    old: '15',
    oldTitle: 'Esclusioni nel settore delle comunicazioni elettroniche',
    newArts: ['56'],
    newTitle: 'Appalti esclusi nei settori ordinari',
    tema: 'Ambito',
    descrizione: 'Esclusioni per il settore delle comunicazioni elettroniche.',
    commi2016: '1-2',
    commi2023: '1',
  },
  {
    old: '16',
    oldTitle:
      'Contratti e concorsi di progettazione aggiudicati in base a norme internazionali',
    newArts: ['138'],
    newTitle: 'Contratti aggiudicati in base a norme internazionali',
    tema: 'Ambito',
    descrizione:
      'Contratti con organizzazioni internazionali o da queste finanziate.',
    commi2016: '1-2',
    commi2023: '1-2',
  },
  {
    old: '17',
    oldTitle: 'Esclusioni specifiche per contratti di appalto e concessioni',
    newArts: ['56'],
    newTitle: 'Appalti esclusi nei settori ordinari',
    tema: 'Ambito',
    descrizione:
      'Contratti esclusi per motivazioni specifiche (difesa, sicurezza nazionale ecc.).',
    commi2016: '1-3',
    commi2023: '1',
  },
  {
    old: '17-bis',
    oldTitle: 'Altri appalti esclusi',
    newArts: ['56'],
    newTitle: 'Appalti esclusi nei settori ordinari',
    tema: 'Ambito',
    descrizione: "Ulteriori esclusioni dall'ambito del codice.",
    commi2016: '1-2',
    commi2023: '1',
  },
  {
    old: '18',
    oldTitle: 'Esclusioni specifiche per contratti di concessioni',
    newArts: ['181'],
    newTitle: 'Contratti esclusi (concessioni)',
    tema: 'Concessioni',
    descrizione: 'Esclusioni specifiche per le concessioni.',
    commi2016: '1-3',
    commi2023: '1-3',
  },
  {
    old: '19',
    oldTitle: 'Contratti di sponsorizzazione',
    newArts: ['134'],
    newTitle: 'Contratti gratuiti e forme speciali di partenariato',
    tema: 'PPP',
    descrizione:
      'La sponsorizzazione rimane contratto speciale soggetto ai principi del codice.',
    commi2016: '1-3',
    commi2023: '1-4',
  },
  {
    old: '20',
    oldTitle: 'Opera pubblica realizzata a spese del privato',
    newArts: ['202'],
    newTitle: 'Cessione di immobili in cambio di opere',
    tema: 'PPP',
    descrizione:
      'Opere realizzate da privati come corrispettivo (permute, cessioni ecc.).',
    commi2016: '1-3',
    commi2023: '1-4',
  },
  {
    old: '21',
    oldTitle: 'Programma degli acquisti e programmazione dei lavori pubblici',
    newArts: ['37'],
    newTitle: 'Programmazione dei lavori e degli acquisti di beni e servizi',
    tema: 'Programmazione',
    descrizione:
      'Programmazione biennale (forniture/servizi) e triennale (lavori). Piano per la Contrattazione Pubblica (PCP).',
    commi2016: '1-8',
    commi2023: '1-5',
  },
  {
    old: '22',
    oldTitle: 'Trasparenza nella partecipazione di portatori di interessi',
    newArts: ['40'],
    newTitle: 'Dibattito pubblico',
    tema: 'Trasparenza',
    descrizione:
      "Il dibattito pubblico e la partecipazione dei portatori di interesse sono disciplinati all'art. 40.",
    commi2016: '1-3',
    commi2023: '1-7',
  },
  {
    old: '23',
    oldTitle: 'Livelli della progettazione per appalti e concessioni',
    newArts: ['41'],
    newTitle: 'Livelli e contenuti della progettazione',
    tema: 'Progettazione',
    descrizione:
      'Tre livelli: DIP, PFTE, progetto esecutivo. Abolito il progetto definitivo come livello autonomo.',
    commi2016: '1-15',
    commi2023: '1-15',
  },
  {
    old: '24',
    oldTitle:
      'Progettazione interna e esterna alle amministrazioni aggiudicatrici',
    newArts: ['All. I.7'],
    newTitle:
      'Allegato I.7 - Requisiti di professionalit\u00e0 dei progettisti',
    tema: 'Progettazione',
    descrizione:
      "Criteri per l'affidamento della progettazione interna o esterna, ora nell'allegato tecnico.",
    commi2016: '1-9',
    commi2023: 'All. I.7',
  },
  {
    old: '25',
    oldTitle: "Verifica preventiva dell'interesse archeologico",
    newArts: ['38'],
    newTitle: 'Localizzazione e approvazione del progetto delle opere',
    tema: 'Progettazione',
    descrizione:
      "Verifica preventiva di interesse archeologico integrata nell'iter di approvazione dei progetti.",
    commi2016: '1-7',
    commi2023: '1-8',
  },
  {
    old: '26',
    oldTitle: 'Verifica preventiva della progettazione',
    newArts: ['42'],
    newTitle: 'Verifica della progettazione',
    tema: 'Progettazione',
    descrizione:
      "Obbligo di verifica di completezza e qualit\u00e0 della progettazione prima dell'approvazione.",
    commi2016: '1-7',
    commi2023: '1-7',
  },
  {
    old: '27',
    oldTitle: 'Procedure di approvazione dei progetti relativi ai lavori',
    newArts: ['38'],
    newTitle: 'Localizzazione e approvazione del progetto delle opere',
    tema: 'Progettazione',
    descrizione:
      'Procedura di approvazione dei progetti di opere pubbliche con conferenza di servizi.',
    commi2016: '1-5',
    commi2023: '1-8',
  },
  {
    old: '28',
    oldTitle: 'Contratti misti di appalto',
    newArts: ['14'],
    newTitle: 'Soglie di rilevanza europea - disciplina dei contratti misti',
    tema: 'Procedure',
    descrizione:
      'Criteri per la disciplina applicabile ai contratti misti di lavori/servizi/forniture.',
    commi2016: '1-5',
    commi2023: '1-15',
  },
  {
    old: '29',
    oldTitle: 'Principi in materia di trasparenza',
    newArts: ['20', '27', '28'],
    newTitle: 'Principi di trasparenza / Pubblicit\u00e0 legale degli atti',
    tema: 'Trasparenza',
    descrizione:
      'Obblighi di pubblicit\u00e0 integrati nel Titolo sulla Digitalizzazione (Artt. 20, 27, 28).',
    commi2016: '1-3',
    commi2023: '1-4',
  },
  {
    old: '30',
    oldTitle:
      "Principi per l'aggiudicazione e l'esecuzione di appalti e concessioni",
    newArts: ['1', '2', '3'],
    newTitle: 'Principio del risultato, fiducia, accesso al mercato',
    tema: 'Principi',
    descrizione:
      'I principi di economicit\u00e0, efficacia, tempestivit\u00e0 ora declinati negli artt. 1 (risultato), 2 (fiducia), 3 (accesso).',
    commi2016: '1-3',
    commi2023: '1-3',
  },
  {
    old: '31',
    oldTitle: 'Ruolo e funzioni del responsabile del procedimento',
    newArts: ['15'],
    newTitle: 'Responsabile unico del progetto (RUP)',
    tema: 'Organizzazione',
    descrizione:
      'Il RUP diventa Responsabile Unico del Progetto con compiti rafforzati in tutte le fasi.',
    commi2016: '1-14',
    commi2023: '1-11',
  },
  {
    old: '32',
    oldTitle: 'Fasi delle procedure di affidamento',
    newArts: ['17'],
    newTitle: 'Fasi delle procedure di affidamento',
    tema: 'Procedure',
    descrizione:
      'Fasi: programmazione, progettazione, pubblicazione, selezione, aggiudicazione, stipula, esecuzione.',
    commi2016: '1-14',
    commi2023: '1-5',
  },
  {
    old: '33',
    oldTitle: 'Controlli sugli atti delle procedure di affidamento',
    newArts: [''],
    newTitle: 'Eliminato (controlli distribuiti nelle singole norme)',
    tema: 'Governance',
    descrizione:
      'I controlli sulla legittimit\u00e0 sono distribuiti nelle singole disposizioni procedurali.',
    commi2016: '1-3',
    commi2023: '\u2014',
  },
  {
    old: '34',
    oldTitle: 'Criteri di sostenibilit\u00e0 energetica e ambientale',
    newArts: ['57', '108'],
    newTitle: 'Clausole sociali / Criteri di aggiudicazione (CAM)',
    tema: 'Procedure',
    descrizione:
      'I Criteri Ambientali Minimi (CAM) sono obbligatori nei criteri di aggiudicazione e nelle clausole del bando.',
    commi2016: '1-3',
    commi2023: '1-4',
  },
  {
    old: '35',
    oldTitle: 'Soglie di rilevanza comunitaria e metodi di calcolo',
    newArts: ['14'],
    newTitle:
      "Soglie di rilevanza europea e metodi di calcolo dell'importo stimato",
    tema: 'Soglie',
    descrizione:
      'Soglie comunitarie aggiornate periodicamente dalla Commissione UE (Reg. 2023/2495 dal 1/1/2024).',
    commi2016: '1-15',
    commi2023: '1-15',
  },
  {
    old: '36',
    oldTitle: 'Contratti sotto soglia',
    newArts: ['48', '49', '50', '51', '52', '53', '54', '55'],
    newTitle: 'Disciplina comune sotto soglia (Libro II, Parte I, Artt. 48-55)',
    tema: 'Sotto soglia',
    descrizione:
      "Il nuovo codice dedica un'intera Parte agli affidamenti sotto soglia con norme semplificate.",
    commi2016: '1-9',
    commi2023: 'Artt. 48-55',
  },
  {
    old: '37',
    oldTitle: 'Aggregazioni e centralizzazione delle committenze',
    newArts: ['62'],
    newTitle: 'Aggregazioni e centralizzazione delle committenze',
    tema: 'Organizzazione',
    descrizione:
      'Obbligo di aggregazione per SA non qualificate; ruolo delle centrali di committenza e di Consip.',
    commi2016: '1-5',
    commi2023: '1-5',
  },
  {
    old: '38',
    oldTitle:
      'Qualificazione delle stazioni appaltanti e centrali di committenza',
    newArts: ['63'],
    newTitle:
      'Qualificazione delle stazioni appaltanti e delle centrali di committenza',
    tema: 'Organizzazione',
    descrizione:
      'Sistema di qualificazione delle SA introdotto organicamente; obbligatorio per procedure sopra soglia.',
    commi2016: '1-12',
    commi2023: '1-8',
  },
  {
    old: '39',
    oldTitle: 'Attivit\u00e0 di committenza ausiliarie',
    newArts: ['62'],
    newTitle: 'Aggregazioni e centralizzazione delle committenze',
    tema: 'Organizzazione',
    descrizione:
      "Le attivit\u00e0 di committenza ausiliaria (supporto alle gare) sono disciplinate insieme all'aggregazione.",
    commi2016: '1-4',
    commi2023: '1-5',
  },
  {
    old: '41',
    oldTitle:
      'Misure di semplificazione delle procedure svolte da centrali di committenza',
    newArts: ['62'],
    newTitle: 'Aggregazioni e centralizzazione delle committenze',
    tema: 'Organizzazione',
    descrizione:
      "Le semplificazioni per le centrali di committenza sono integrate nelle norme sull'aggregazione.",
    commi2016: '1-6',
    commi2023: '1-5',
  },
  {
    old: '42',
    oldTitle: 'Conflitto di interesse',
    newArts: ['16'],
    newTitle: 'Conflitto di interessi',
    tema: 'Organizzazione',
    descrizione:
      'Obbligo di astensione del personale coinvolto nelle procedure in caso di conflitto di interessi anche potenziale.',
    commi2016: '1-5',
    commi2023: '1-6',
  },
  {
    old: '44',
    oldTitle: 'Digitalizzazione delle procedure',
    newArts: [
      '19',
      '20',
      '21',
      '22',
      '23',
      '24',
      '25',
      '26',
      '27',
      '28',
      '29',
      '30',
      '31',
    ],
    newTitle: 'Principi digitali / Ecosistema e-procurement (Artt. 19-31)',
    tema: 'Digitalizzazione',
    descrizione:
      "La digitalizzazione diventa un'intera Parte (Libro I, Parte II): principi digitali, BDNCP, fascicolo virtuale, piattaforme certificate, pubblicit\u00e0 legale.",
    commi2016: '1-5',
    commi2023: 'Artt. 19-31',
  },
  {
    old: '45',
    oldTitle: 'Operatori economici',
    newArts: ['65'],
    newTitle: 'Operatori economici',
    tema: 'Operatori',
    descrizione:
      'Soggetti ammessi alle gare: imprese individuali, societ\u00e0, consorzi, RTI, GEIE, fondazioni.',
    commi2016: '1-3',
    commi2023: '1-4',
  },
  {
    old: '46',
    oldTitle:
      "Operatori economici per l'affidamento dei servizi di architettura e ingegneria",
    newArts: ['66'],
    newTitle: 'Operatori economici per servizi di architettura e ingegneria',
    tema: 'Operatori',
    descrizione:
      'Soggetti abilitati alla progettazione: professionisti, studi associati, societ\u00e0 di ingegneria, universit\u00e0.',
    commi2016: '1-4',
    commi2023: '1-4',
  },
  {
    old: '47',
    oldTitle: 'Requisiti per la partecipazione dei consorzi alle gare',
    newArts: ['67'],
    newTitle: 'Consorzi non necessari',
    tema: 'Operatori',
    descrizione:
      'Disciplina requisiti e modalit\u00e0 di partecipazione dei consorzi stabili e ordinari.',
    commi2016: '1-4',
    commi2023: '1-5',
  },
  {
    old: '48',
    oldTitle:
      'Raggruppamenti temporanei e consorzi ordinari di operatori economici',
    newArts: ['68'],
    newTitle: 'Raggruppamenti temporanei e consorzi ordinari',
    tema: 'Operatori',
    descrizione:
      'Regola costituzione, requisiti e responsabilit\u00e0 dei RTI e dei consorzi ordinari.',
    commi2016: '1-21',
    commi2023: '1-12',
  },
  {
    old: '49',
    oldTitle: "Condizioni relative all'AAP e ad altri accordi internazionali",
    newArts: ['69'],
    newTitle: 'Accordo sugli Appalti Pubblici (AAP)',
    tema: 'Ambito',
    descrizione:
      "Appalti soggetti all'Accordo sugli Appalti Pubblici dell'OMC.",
    commi2016: '1-2',
    commi2023: '1-2',
  },
  {
    old: '50',
    oldTitle: 'Clausole sociali del bando di gara e degli avvisi',
    newArts: ['57'],
    newTitle:
      'Clausole sociali del bando di gara e degli avvisi e criteri di sostenibilit\u00e0',
    tema: 'Operatori',
    descrizione:
      'Obbligo di inserire nei bandi clausole per stabilit\u00e0 occupazionale e applicazione dei CCNL.',
    commi2016: '1',
    commi2023: '1-4',
  },
  {
    old: '51',
    oldTitle: 'Suddivisione in lotti',
    newArts: ['58'],
    newTitle: 'Suddivisione in lotti',
    tema: 'Procedure',
    descrizione:
      'Obbligo o facolt\u00e0 di suddividere i contratti in lotti per favorire le PMI.',
    commi2016: '1-3',
    commi2023: '1-4',
  },
  {
    old: '52',
    oldTitle: 'Regole applicabili alle comunicazioni',
    newArts: ['29'],
    newTitle: 'Regole applicabili alle comunicazioni',
    tema: 'Digitalizzazione',
    descrizione:
      'Comunicazioni nelle procedure obbligatoriamente per via elettronica tramite piattaforme certificate.',
    commi2016: '1-10',
    commi2023: '1-6',
  },
  {
    old: '53',
    oldTitle: 'Accesso agli atti e riservatezza',
    newArts: ['35', '36'],
    newTitle: 'Accesso agli atti e riservatezza / Norme processuali',
    tema: 'Trasparenza',
    descrizione:
      'Accesso ai documenti di gara bilanciando trasparenza e riservatezza commerciale.',
    commi2016: '1-7',
    commi2023: '1-7',
  },
  {
    old: '54',
    oldTitle: 'Accordi quadro',
    newArts: ['59'],
    newTitle: 'Accordi quadro',
    tema: 'Strumenti',
    descrizione:
      'Accordi con uno o pi\u00f9 operatori per determinare condizioni applicabili ai contratti successivi per max 4 anni.',
    commi2016: '1-8',
    commi2023: '1-7',
  },
  {
    old: '55',
    oldTitle: 'Sistemi dinamici di acquisizione',
    newArts: ['32'],
    newTitle: 'Sistemi dinamici di acquisizione',
    tema: 'Strumenti',
    descrizione:
      'Strumento elettronico per acquisti correnti disponibile per tutti gli operatori qualificati.',
    commi2016: '1-12',
    commi2023: '1-11',
  },
  {
    old: '56',
    oldTitle: 'Aste elettroniche',
    newArts: ['33'],
    newTitle: 'Aste elettroniche',
    tema: 'Strumenti',
    descrizione:
      'Procedura elettronica per presentazione di nuovi prezzi ridotti o valori delle offerte.',
    commi2016: '1-8',
    commi2023: '1-8',
  },
  {
    old: '57',
    oldTitle: 'Cataloghi elettronici',
    newArts: ['34'],
    newTitle: 'Cataloghi elettronici',
    tema: 'Strumenti',
    descrizione:
      'Formato per la presentazione di offerte tramite catalogo elettronico standardizzato.',
    commi2016: '1-6',
    commi2023: '1-6',
  },
  {
    old: '58',
    oldTitle:
      'Procedure svolte attraverso piattaforme telematiche di negoziazione',
    newArts: ['25'],
    newTitle: 'Piattaforme di approvvigionamento digitale',
    tema: 'Digitalizzazione',
    descrizione:
      'Le piattaforme telematiche per le procedure di gara devono essere certificate e interoperabili con la BDNCP.',
    commi2016: '1-6',
    commi2023: '1-9',
  },
  {
    old: '59',
    oldTitle: 'Scelta delle procedure e oggetto del contratto',
    newArts: ['70'],
    newTitle: 'Procedure di scelta e relativi presupposti',
    tema: 'Procedure',
    descrizione:
      "Regola la scelta tra procedura aperta, ristretta, negoziata, dialogo competitivo, partenariato per l'innovazione.",
    commi2016: '1-6',
    commi2023: '1-4',
  },
  {
    old: '60',
    oldTitle: 'Procedura aperta',
    newArts: ['71'],
    newTitle: 'Procedura aperta',
    tema: 'Procedure',
    descrizione:
      "Tutti gli operatori economici interessati possono presentare un'offerta.",
    commi2016: '1-4',
    commi2023: '1-5',
  },
  {
    old: '61',
    oldTitle: 'Procedura ristretta',
    newArts: ['72'],
    newTitle: 'Procedura ristretta',
    tema: 'Procedure',
    descrizione:
      'Solo i candidati invitati dalla SA dopo preselezione possono presentare offerta.',
    commi2016: '1-3',
    commi2023: '1-4',
  },
  {
    old: '62',
    oldTitle: 'Procedura competitiva con negoziazione',
    newArts: ['73'],
    newTitle: 'Procedura competitiva con negoziazione',
    tema: 'Procedure',
    descrizione:
      'Negoziazione delle condizioni contrattuali dopo la presentazione delle offerte iniziali.',
    commi2016: '1-6',
    commi2023: '1-6',
  },
  {
    old: '63',
    oldTitle:
      'Uso della procedura negoziata senza previa pubblicazione di bando',
    newArts: ['76'],
    newTitle: 'Procedura negoziata senza pubblicazione di un bando',
    tema: 'Procedure',
    descrizione:
      'In casi eccezionali tassativamente previsti si tratta direttamente con uno o pi\u00f9 operatori.',
    commi2016: '1-7',
    commi2023: '1-8',
  },
  {
    old: '64',
    oldTitle: 'Dialogo competitivo',
    newArts: ['74'],
    newTitle: 'Dialogo competitivo',
    tema: 'Procedure',
    descrizione:
      'La SA avvia un dialogo con gli offerenti per definire la soluzione migliore per contratti complessi.',
    commi2016: '1-7',
    commi2023: '1-7',
  },
  {
    old: '65',
    oldTitle: "Partenariato per l'innovazione",
    newArts: ['75'],
    newTitle: "Partenariato per l'innovazione",
    tema: 'Procedure',
    descrizione:
      'Procedura per acquistare prodotti o servizi innovativi non disponibili sul mercato.',
    commi2016: '1-8',
    commi2023: '1-8',
  },
  {
    old: '66',
    oldTitle: 'Consultazioni preliminari di mercato',
    newArts: ['77'],
    newTitle: 'Consultazioni preliminari di mercato',
    tema: 'Procedure',
    descrizione:
      "La SA pu\u00f2 svolgere consultazioni di mercato prima della gara per orientare l'oggetto dell'appalto.",
    commi2016: '1-5',
    commi2023: '1-5',
  },
  {
    old: '67',
    oldTitle: 'Partecipazione precedente di candidati o offerenti',
    newArts: ['78'],
    newTitle:
      'Partecipazione alle consultazioni preliminari di candidati o offerenti',
    tema: 'Procedure',
    descrizione:
      'Regola la partecipazione alla gara di soggetti che hanno preso parte alle consultazioni preliminari.',
    commi2016: '1-4',
    commi2023: '1-4',
  },
  {
    old: '68',
    oldTitle: 'Specifiche tecniche',
    newArts: ['79'],
    newTitle: 'Specifiche tecniche',
    tema: 'Procedure',
    descrizione:
      'Modalit\u00e0 di redazione delle specifiche tecniche: riferimento a norme, prestazioni, etichettature.',
    commi2016: '1-10',
    commi2023: '1-11',
  },
  {
    old: '69',
    oldTitle: 'Etichettature',
    newArts: ['80'],
    newTitle: 'Etichettature',
    tema: 'Procedure',
    descrizione:
      'Uso di etichette ambientali, sociali o di altro tipo come specifiche o criteri di aggiudicazione.',
    commi2016: '1-8',
    commi2023: '1-7',
  },
  {
    old: '70',
    oldTitle: 'Avvisi di preinformazione',
    newArts: ['81'],
    newTitle: 'Avvisi di pre-informazione',
    tema: 'Procedure',
    descrizione:
      "Pubblicazione preventiva dell'intenzione di aggiudicare un contratto; riduce i termini di gara.",
    commi2016: '1-4',
    commi2023: '1-5',
  },
  {
    old: '71',
    oldTitle: 'Bandi di gara',
    newArts: ['83'],
    newTitle: 'Bandi e avvisi: contenuti e modalit\u00e0 di redazione',
    tema: 'Procedure',
    descrizione: 'Contenuti obbligatori e facoltativi dei bandi di gara.',
    commi2016: '1-5',
    commi2023: '1-8',
  },
  {
    old: '72',
    oldTitle:
      'Redazione e modalit\u00e0 di pubblicazione dei bandi e degli avvisi',
    newArts: ['83', '84', '85'],
    newTitle: 'Bandi e avvisi / Pubblicazione europea e nazionale',
    tema: 'Procedure',
    descrizione:
      'Modalit\u00e0 di pubblicazione a livello europeo (GUUE) e nazionale (piattaforma digitale).',
    commi2016: '1-5',
    commi2023: '1-5',
  },
  {
    old: '73',
    oldTitle: 'Pubblicazione a livello nazionale',
    newArts: ['85'],
    newTitle: 'Pubblicazione a livello nazionale',
    tema: 'Procedure',
    descrizione:
      'Obblighi di pubblicazione nazionale su piattaforma digitale; sostituisce GURI e profili committente.',
    commi2016: '1-4',
    commi2023: '1-4',
  },
  {
    old: '74',
    oldTitle: 'Disponibilit\u00e0 elettronica dei documenti di gara',
    newArts: ['88'],
    newTitle: 'Disponibilit\u00e0 digitale dei documenti di gara',
    tema: 'Procedure',
    descrizione:
      'Obbligo di mettere a disposizione per via elettronica tutta la documentazione di gara.',
    commi2016: '1-3',
    commi2023: '1-4',
  },
  {
    old: '75',
    oldTitle: 'Inviti ai candidati',
    newArts: ['89'],
    newTitle: 'Inviti ai candidati',
    tema: 'Procedure',
    descrizione:
      'Modalit\u00e0 e contenuti degli inviti nella procedura ristretta e negoziata.',
    commi2016: '1-5',
    commi2023: '1-5',
  },
  {
    old: '76',
    oldTitle: 'Informazione dei candidati e degli offerenti',
    newArts: ['90'],
    newTitle: 'Informazione ai candidati e agli offerenti',
    tema: 'Procedure',
    descrizione:
      'Obbligo di comunicare gli esiti della gara a tutti i partecipanti entro termini perentori.',
    commi2016: '1-4',
    commi2023: '1-5',
  },
  {
    old: '77',
    oldTitle: 'Commissione giudicatrice',
    newArts: ['51', '93'],
    newTitle: 'Commissione giudicatrice (Artt. 51 e 93)',
    tema: 'Procedure',
    descrizione:
      'Art. 51 (sotto soglia) e art. 93 (sopra soglia). Composizione semplificata; nomina tramite albo ANAC.',
    commi2016: '1-12',
    commi2023: '1-9',
  },
  {
    old: '78',
    oldTitle: 'Albo dei componenti delle commissioni giudicatrici',
    newArts: ['All. XIV'],
    newTitle: 'Albo commissari ANAC',
    tema: 'Procedure',
    descrizione: "ANAC gestisce l'albo nazionale dei commissari esperti.",
    commi2016: '1-4',
    commi2023: 'All. XIV',
  },
  {
    old: '79',
    oldTitle: 'Fissazione di termini',
    newArts: ['92'],
    newTitle:
      'Fissazione dei termini per la presentazione delle domande e delle offerte',
    tema: 'Procedure',
    descrizione:
      'Termini minimi per la presentazione delle offerte nelle diverse procedure.',
    commi2016: '1-8',
    commi2023: '1-8',
  },
  {
    old: '80',
    oldTitle: 'Motivi di esclusione',
    newArts: ['94', '95', '96', '97', '98', '99'],
    newTitle: 'Cause di esclusione automatica e non automatica (Artt. 94-99)',
    tema: 'Requisiti',
    descrizione:
      'Distinzione: cause automatiche (art. 94), non automatiche (art. 95-96), self-cleaning (art. 97), illecito professionale (art. 98), verifica requisiti (art. 99).',
    commi2016: '1-13',
    commi2023: 'Artt. 94-99',
  },
  {
    old: '81',
    oldTitle: 'Documentazione di gara',
    newArts: ['82', '87'],
    newTitle: 'Documenti di gara / Disciplinare e capitolato speciale',
    tema: 'Procedure',
    descrizione:
      'La documentazione di gara include disciplinare, capitolato e tutti gli atti del procedimento.',
    commi2016: '1-4',
    commi2023: '1-4',
  },
  {
    old: '82',
    oldTitle: 'Rapporti di prova, certificazione e altri mezzi di prova',
    newArts: ['105'],
    newTitle:
      'Rapporti di prova, certificazioni di qualit\u00e0, mezzi di prova',
    tema: 'Requisiti',
    descrizione:
      'Mezzi di prova ammissibili per dimostrare i requisiti tecnici e qualitativi.',
    commi2016: '1-4',
    commi2023: '1-4',
  },
  {
    old: '83',
    oldTitle: 'Criteri di selezione e soccorso istruttorio',
    newArts: ['100', '101'],
    newTitle: 'Requisiti di ordine speciale / Soccorso istruttorio',
    tema: 'Requisiti',
    descrizione:
      "I criteri di selezione sono ora in articoli distinti (art. 100); il soccorso istruttorio all'art. 101.",
    commi2016: '1-10',
    commi2023: '1-7',
  },
  {
    old: '84',
    oldTitle:
      'Sistema unico di qualificazione degli esecutori di lavori pubblici',
    newArts: ['All. II.12'],
    newTitle: 'Qualificazione degli esecutori di lavori - Allegato II.12',
    tema: 'Requisiti',
    descrizione:
      "Il sistema SOA per la qualificazione degli esecutori di lavori pubblici e' nell'allegato.",
    commi2016: '1-15',
    commi2023: 'All. II.12',
  },
  {
    old: '85',
    oldTitle: 'Documento di gara unico europeo',
    newArts: ['91'],
    newTitle: 'Domande, documento di gara unico europeo (DGUE), offerte',
    tema: 'Requisiti',
    descrizione:
      'DGUE: autocertificazione standardizzata UE per dimostrare i requisiti. Versione digitale obbligatoria.',
    commi2016: '1-5',
    commi2023: '1-3',
  },
  {
    old: '86',
    oldTitle: 'Mezzi di prova',
    newArts: ['105'],
    newTitle:
      'Rapporti di prova, certificazioni di qualit\u00e0, mezzi di prova',
    tema: 'Requisiti',
    descrizione:
      'Mezzi di prova ammissibili per dimostrare i requisiti di partecipazione.',
    commi2016: '1-5',
    commi2023: '1-4',
  },
  {
    old: '87',
    oldTitle: 'Certificazione delle qualit\u00e0',
    newArts: ['105'],
    newTitle:
      'Rapporti di prova, certificazioni di qualit\u00e0, mezzi di prova',
    tema: 'Requisiti',
    descrizione:
      'Uso di certificazioni di qualit\u00e0 (ISO, EMAS, ecc.) come mezzo di prova.',
    commi2016: '1-3',
    commi2023: '1-4',
  },
  {
    old: '88',
    oldTitle: 'Registro on line dei certificati (e-Certis)',
    newArts: ['24'],
    newTitle: "Fascicolo virtuale dell'operatore economico",
    tema: 'Digitalizzazione',
    descrizione:
      "L'e-Certis europeo e' integrato nel Fascicolo Virtuale dell'Operatore Economico (FVOE).",
    commi2016: '1-3',
    commi2023: '1-7',
  },
  {
    old: '89',
    oldTitle: 'Avvalimento',
    newArts: ['104'],
    newTitle: 'Avvalimento',
    tema: 'Operatori',
    descrizione:
      'Istituto che consente a un operatore di far valere i requisiti di un altro soggetto ausiliario.',
    commi2016: '1-11',
    commi2023: '1-9',
  },
  {
    old: '90',
    oldTitle:
      'Elenchi ufficiali di operatori economici riconosciuti e certificazione',
    newArts: ['24'],
    newTitle: "Fascicolo virtuale dell'operatore economico",
    tema: 'Digitalizzazione',
    descrizione:
      "Gli elenchi ufficiali sono integrati nel Fascicolo Virtuale dell'Operatore Economico (FVOE).",
    commi2016: '1-6',
    commi2023: '1-7',
  },
  {
    old: '91',
    oldTitle: 'Riduzione del numero di candidati qualificati da invitare',
    newArts: ['72'],
    newTitle: 'Procedura ristretta - riduzione candidati',
    tema: 'Procedure',
    descrizione:
      'Criteri per selezionare il numero di candidati da invitare nelle procedure ristrette.',
    commi2016: '1-5',
    commi2023: '1-4',
  },
  {
    old: '92',
    oldTitle: 'Riduzione del numero di offerte e soluzioni',
    newArts: ['73'],
    newTitle: 'Procedura competitiva con negoziazione - riduzione offerte',
    tema: 'Procedure',
    descrizione: 'Criteri per ridurre le offerte nelle procedure negoziate.',
    commi2016: '1-3',
    commi2023: '1-6',
  },
  {
    old: '93',
    oldTitle: 'Garanzie per la partecipazione alla procedura',
    newArts: ['106'],
    newTitle: 'Garanzia provvisoria',
    tema: 'Garanzie',
    descrizione:
      "Cauzione provvisoria a corredo dell'offerta con riduzioni per certificazioni di qualit\u00e0.",
    commi2016: '1-12',
    commi2023: '1-9',
  },
  {
    old: '94',
    oldTitle: 'Principi generali in materia di selezione',
    newArts: ['107'],
    newTitle: 'Principi generali in materia di selezione',
    tema: 'Requisiti',
    descrizione:
      'Principi che regolano la selezione dei partecipanti alle procedure.',
    commi2016: '1-2',
    commi2023: '1-3',
  },
  {
    old: '95',
    oldTitle: "Criteri di aggiudicazione dell'appalto",
    newArts: ['108'],
    newTitle: 'Criteri di aggiudicazione degli appalti',
    tema: 'Aggiudicazione',
    descrizione:
      "OEPV come criterio ordinario. Prezzo piu' basso ammesso solo in casi residuali. Integrazione obbligatoria di CAM e criteri sociali.",
    commi2016: '1-14',
    commi2023: '1-11',
  },
  {
    old: '96',
    oldTitle: 'Costi del ciclo di vita',
    newArts: ['108'],
    newTitle: 'Criteri di aggiudicazione (LCC incluso)',
    tema: 'Aggiudicazione',
    descrizione:
      "Il Life Cycle Cost (LCC) puo' essere utilizzato come criterio di aggiudicazione.",
    commi2016: '1-6',
    commi2023: '1-2',
  },
  {
    old: '97',
    oldTitle: 'Offerte anormalmente basse',
    newArts: ['110'],
    newTitle: 'Anomalia delle offerte',
    tema: 'Aggiudicazione',
    descrizione:
      'Meccanismi di rilevazione automatica e verifica delle offerte anomale. Soglie ricalibrate.',
    commi2016: '1-8',
    commi2023: '1-8',
  },
  {
    old: '98',
    oldTitle: 'Avvisi relativi agli appalti aggiudicati',
    newArts: ['111'],
    newTitle: 'Avvisi relativi agli appalti aggiudicati',
    tema: 'Trasparenza',
    descrizione:
      "Obbligo di pubblicare l'esito della procedura di aggiudicazione.",
    commi2016: '1-4',
    commi2023: '1-4',
  },
  {
    old: '99',
    oldTitle: 'Relazioni uniche sulle procedure di aggiudicazione',
    newArts: ['112'],
    newTitle:
      'Relazioni uniche sulle procedure di aggiudicazione degli appalti',
    tema: 'Trasparenza',
    descrizione:
      'Obbligo di redazione di relazione per ciascuna procedura aggiudicata.',
    commi2016: '1-4',
    commi2023: '1-4',
  },
  {
    old: '100',
    oldTitle: "Requisiti per l'esecuzione dell'appalto",
    newArts: ['113'],
    newTitle: "Requisiti per l'esecuzione dell'appalto",
    tema: 'Esecuzione',
    descrizione:
      "Condizioni che il contraente deve mantenere per tutta la durata dell'esecuzione.",
    commi2016: '1',
    commi2023: '1',
  },
  {
    old: '101',
    oldTitle: 'Soggetti delle stazioni appaltanti',
    newArts: ['114'],
    newTitle: "Direzione dei lavori e dell'esecuzione dei contratti",
    tema: 'Esecuzione',
    descrizione:
      "Ruoli del Direttore dei Lavori (DL) e del Direttore dell'Esecuzione (DE).",
    commi2016: '1-5',
    commi2023: '1-5',
  },
  {
    old: '102',
    oldTitle: "Collaudo e verifica di conformita'",
    newArts: ['115', '116'],
    newTitle: "Verifica di conformita' e collaudo (Artt. 115-116)",
    tema: 'Esecuzione',
    descrizione:
      "Procedure di collaudo tecnico-amministrativo e verifica di conformita' per servizi e forniture.",
    commi2016: '1-10',
    commi2023: '1-7',
  },
  {
    old: '103',
    oldTitle: 'Garanzie definitive',
    newArts: ['117'],
    newTitle: 'Garanzia definitiva',
    tema: 'Garanzie',
    descrizione:
      "Garanzia fidejussoria che l'aggiudicatario deve costituire prima della stipula del contratto.",
    commi2016: '1-10',
    commi2023: '1-8',
  },
  {
    old: '104',
    oldTitle: "Garanzie per l'esecuzione di lavori di particolare valore",
    newArts: ['118'],
    newTitle: "Garanzie per l'esecuzione di lavori di particolare valore",
    tema: 'Garanzie',
    descrizione:
      'Garanzie aggiuntive richieste per appalti di lavori di importo rilevante.',
    commi2016: '1-4',
    commi2023: '1-3',
  },
  {
    old: '105',
    oldTitle: 'Subappalto',
    newArts: ['119'],
    newTitle: 'Subappalto',
    tema: 'Esecuzione',
    descrizione:
      "Rimosso il limite del 30%: il subappalto e' liberalizzato in conformita' alla direttiva UE, salvo categorie a qualificazione obbligatoria.",
    commi2016: '1-25',
    commi2023: '1-16',
  },
  {
    old: '106',
    oldTitle: 'Modifica di contratti durante il periodo di efficacia',
    newArts: ['120'],
    newTitle: 'Modifica dei contratti in corso di esecuzione',
    tema: 'Esecuzione',
    descrizione:
      'Condizioni per modificare il contratto senza nuova gara: varianti, errori, eventi imprevisti, opzioni.',
    commi2016: '1-14',
    commi2023: '1-12',
  },
  {
    old: '107',
    oldTitle: 'Sospensione',
    newArts: ['121'],
    newTitle: "Sospensione dell'esecuzione",
    tema: 'Esecuzione',
    descrizione:
      'Condizioni e procedure per la sospensione dei lavori, con obblighi di verbale e risarcimento.',
    commi2016: '1-8',
    commi2023: '1-6',
  },
  {
    old: '108',
    oldTitle: 'Risoluzione',
    newArts: ['122', '123'],
    newTitle: 'Risoluzione / Recesso (Artt. 122-123)',
    tema: 'Esecuzione',
    descrizione:
      'Cause di risoluzione per inadempimento, fallimento del contraente, motivi di interesse pubblico.',
    commi2016: '1-8',
    commi2023: '1-7',
  },
  {
    old: '109',
    oldTitle: 'Recesso',
    newArts: ['123'],
    newTitle: 'Recesso',
    tema: 'Esecuzione',
    descrizione:
      "Il recesso unilaterale della SA dal contratto e' disciplinato all'art. 123 del nuovo codice.",
    commi2016: '1-2',
    commi2023: '1-3',
  },
  {
    old: '111',
    oldTitle: 'Controllo tecnico, contabile e amministrativo',
    newArts: ['115'],
    newTitle: 'Controllo tecnico contabile e amministrativo',
    tema: 'Esecuzione',
    descrizione:
      "Attivita' di controllo sull'esecuzione delle prestazioni contrattuali.",
    commi2016: '1-5',
    commi2023: '1-5',
  },
  {
    old: '112',
    oldTitle: 'Appalti e concessioni riservati',
    newArts: ['61', '129'],
    newTitle: 'Contratti riservati / Appalti riservati (Artt. 61 e 129)',
    tema: 'Procedure',
    descrizione:
      'Riserva di contratti a cooperative sociali, ONLUS, organizzazioni di inserimento lavorativo.',
    commi2016: '1-3',
    commi2023: '1-3',
  },
  {
    old: '113',
    oldTitle: 'Incentivi per funzioni tecniche',
    newArts: ['45'],
    newTitle: 'Incentivi alle funzioni tecniche',
    tema: 'Organizzazione',
    descrizione:
      'Compensi ai dipendenti PA che svolgono funzioni tecniche (RUP, verificatori, collaudatori).',
    commi2016: '1-5',
    commi2023: '1-7',
  },
  {
    old: '114',
    oldTitle: 'Norme applicabili e ambito soggettivo dei settori speciali',
    newArts: ['141'],
    newTitle: 'Ambito e norme applicabili (settori speciali)',
    tema: 'Settori speciali',
    descrizione:
      'I settori speciali (acqua, energia, trasporti, postali) sono regolati nel Libro III con norme ad hoc.',
    commi2016: '1-4',
    commi2023: '1-4',
  },
  {
    old: '115',
    oldTitle: 'Gas ed energia termica',
    newArts: ['146'],
    newTitle: 'Gas ed energia termica (settori speciali)',
    tema: 'Settori speciali',
    descrizione:
      'Disciplina specifica per gli appalti nel settore del gas ed energia termica.',
    commi2016: '1-2',
    commi2023: '1-2',
  },
  {
    old: '116',
    oldTitle: "Elettricita'",
    newArts: ['147'],
    newTitle: "Elettricita' (settori speciali)",
    tema: 'Settori speciali',
    descrizione:
      "Disciplina specifica per gli appalti nel settore dell'elettricita'.",
    commi2016: '1-3',
    commi2023: '1-3',
  },
  {
    old: '117',
    oldTitle: 'Acqua',
    newArts: ['148'],
    newTitle: 'Acqua (settori speciali)',
    tema: 'Settori speciali',
    descrizione: 'Disciplina specifica per gli appalti nel settore idrico.',
    commi2016: '1-3',
    commi2023: '1-3',
  },
  {
    old: '118',
    oldTitle: 'Servizi di trasporto',
    newArts: ['149'],
    newTitle: 'Servizi di trasporto (settori speciali)',
    tema: 'Settori speciali',
    descrizione:
      'Disciplina specifica per gli appalti nel settore dei trasporti.',
    commi2016: '1-3',
    commi2023: '1-3',
  },
  {
    old: '119',
    oldTitle: 'Porti e aeroporti',
    newArts: ['150'],
    newTitle: 'Settore dei porti e degli aeroporti (settori speciali)',
    tema: 'Settori speciali',
    descrizione:
      'Disciplina specifica per gli appalti nel settore portuale e aeroportuale.',
    commi2016: '1-2',
    commi2023: '1-2',
  },
  {
    old: '120',
    oldTitle: 'Servizi postali',
    newArts: ['151'],
    newTitle: 'Settore dei servizi postali (settori speciali)',
    tema: 'Settori speciali',
    descrizione:
      'Disciplina specifica per gli appalti nel settore dei servizi postali.',
    commi2016: '1-3',
    commi2023: '1-3',
  },
  {
    old: '121',
    oldTitle: 'Estrazione di gas e prospezione di carbone',
    newArts: ['152'],
    newTitle: 'Estrazione di gas e prospezione di carbone (settori speciali)',
    tema: 'Settori speciali',
    descrizione: 'Disciplina specifica per gli appalti nel settore estrattivo.',
    commi2016: '1-2',
    commi2023: '1-2',
  },
  {
    old: '122',
    oldTitle: 'Norme applicabili nei settori speciali',
    newArts: ['153'],
    newTitle: 'Norme applicabili nei settori speciali',
    tema: 'Settori speciali',
    descrizione:
      'Norme generali applicabili alle procedure di aggiudicazione nei settori speciali.',
    commi2016: '1-4',
    commi2023: '1-4',
  },
  {
    old: '123',
    oldTitle: 'Scelta delle procedure nei settori speciali',
    newArts: ['155'],
    newTitle: 'Tipi di procedure (settori speciali)',
    tema: 'Settori speciali',
    descrizione:
      'Scelta tra procedura aperta, ristretta, negoziata nei settori speciali.',
    commi2016: '1-4',
    commi2023: '1-4',
  },
  {
    old: '124',
    oldTitle: 'Procedura negoziata con previa indizione di gara',
    newArts: ['157'],
    newTitle:
      'Procedura negoziata con pubblicazione di un bando (settori speciali)',
    tema: 'Settori speciali',
    descrizione: 'Procedura negoziata preceduta da bando nei settori speciali.',
    commi2016: '1-5',
    commi2023: '1-5',
  },
  {
    old: '125',
    oldTitle: 'Uso della procedura negoziata senza previa indizione di gara',
    newArts: ['158'],
    newTitle:
      'Procedura negoziata senza pubblicazione di un bando (settori speciali)',
    tema: 'Settori speciali',
    descrizione:
      'Procedura negoziata diretta nei settori speciali per casi eccezionali.',
    commi2016: '1-5',
    commi2023: '1-5',
  },
  {
    old: '126',
    oldTitle: 'Comunicazione delle specifiche tecniche',
    newArts: ['160'],
    newTitle: 'Comunicazione delle specifiche tecniche (settori speciali)',
    tema: 'Settori speciali',
    descrizione:
      'Obbligo di comunicare le specifiche tecniche usate nei settori speciali.',
    commi2016: '1-3',
    commi2023: '1-3',
  },
  {
    old: '127',
    oldTitle: "Pubblicita' e avviso periodico indicativo nei settori speciali",
    newArts: ['161'],
    newTitle: "Pubblicita' e avviso periodico indicativo (settori speciali)",
    tema: 'Settori speciali',
    descrizione:
      "Obblighi di pubblicita' nei settori speciali, incluso l'avviso periodico indicativo.",
    commi2016: '1-5',
    commi2023: '1-5',
  },
  {
    old: '128',
    oldTitle: "Avvisi sull'esistenza di un sistema di qualificazione",
    newArts: ['162'],
    newTitle:
      "Avvisi sull'esistenza di un sistema di qualificazione (settori speciali)",
    tema: 'Settori speciali',
    descrizione:
      'Obbligo di pubblicare avvisi per i sistemi di qualificazione nei settori speciali.',
    commi2016: '1-3',
    commi2023: '1-3',
  },
  {
    old: '129',
    oldTitle:
      'Bandi di gara e avvisi relativi agli appalti aggiudicati nei settori speciali',
    newArts: ['163'],
    newTitle: 'Bandi di gara e avvisi aggiudicazione (settori speciali)',
    tema: 'Settori speciali',
    descrizione:
      'Contenuti dei bandi e degli avvisi di aggiudicazione nei settori speciali.',
    commi2016: '1-4',
    commi2023: '1-4',
  },
  {
    old: '130',
    oldTitle:
      "Redazione e modalita' di pubblicazione dei bandi nei settori speciali",
    newArts: ['164'],
    newTitle: "Redazione e modalita' di pubblicazione (settori speciali)",
    tema: 'Settori speciali',
    descrizione:
      "Modalita' di redazione e pubblicazione dei bandi di gara nei settori speciali.",
    commi2016: '1-3',
    commi2023: '1-3',
  },
  {
    old: '131',
    oldTitle: 'Inviti ai candidati nei settori speciali',
    newArts: ['165'],
    newTitle: 'Inviti ai candidati (settori speciali)',
    tema: 'Settori speciali',
    descrizione:
      "Modalita' e contenuto degli inviti ai candidati nelle procedure nei settori speciali.",
    commi2016: '1-4',
    commi2023: '1-4',
  },
  {
    old: '132',
    oldTitle: 'Informazioni per i partecipanti ai sistemi di qualificazione',
    newArts: ['166'],
    newTitle:
      'Informazioni ai partecipanti ai sistemi di qualificazione (settori speciali)',
    tema: 'Settori speciali',
    descrizione:
      'Obblighi informativi verso i candidati ai sistemi di qualificazione.',
    commi2016: '1-3',
    commi2023: '1-3',
  },
  {
    old: '133',
    oldTitle:
      'Principi generali per la selezione dei partecipanti nei settori speciali',
    newArts: ['167'],
    newTitle:
      'Ulteriori disposizioni applicabili nella scelta del contraente (settori speciali)',
    tema: 'Settori speciali',
    descrizione:
      'Principi che regolano la selezione dei partecipanti nei settori speciali.',
    commi2016: '1-3',
    commi2023: '1-3',
  },
  {
    old: '134',
    oldTitle: 'Sistemi di qualificazione nei settori speciali',
    newArts: ['All. II.18'],
    newTitle: 'Allegato II.18 - Sistemi di qualificazione nei settori speciali',
    tema: 'Settori speciali',
    descrizione:
      "I sistemi di qualificazione dei fornitori nei settori speciali sono disciplinati nell'allegato.",
    commi2016: '1-8',
    commi2023: 'All. II.18',
  },
  {
    old: '135',
    oldTitle:
      'Criteri di selezione qualitativa e avvalimento nei settori speciali',
    newArts: ['104'],
    newTitle: 'Avvalimento',
    tema: 'Operatori',
    descrizione:
      "L'avvalimento nei settori speciali segue le stesse regole generali dell'art. 104.",
    commi2016: '1-6',
    commi2023: '1-9',
  },
  {
    old: '137',
    oldTitle: 'Offerte contenenti prodotti originari di Paesi terzi',
    newArts: ['170'],
    newTitle:
      'Offerte contenenti prodotti originari di Paesi terzi (settori speciali)',
    tema: 'Settori speciali',
    descrizione:
      'Disciplina del trattamento delle offerte con prodotti di Paesi terzi nei settori speciali.',
    commi2016: '1-4',
    commi2023: '1-4',
  },
  {
    old: '138',
    oldTitle:
      'Relazioni con Paesi terzi in materia di lavori, servizi e forniture',
    newArts: ['171'],
    newTitle: 'Relazioni con Paesi terzi (settori speciali)',
    tema: 'Settori speciali',
    descrizione:
      'Disciplina delle relazioni con operatori di Paesi terzi nei settori speciali.',
    commi2016: '1-5',
    commi2023: '1-5',
  },
  {
    old: '139',
    oldTitle:
      'Relazioni uniche sulle procedure di aggiudicazione nei settori speciali',
    newArts: ['172'],
    newTitle:
      'Relazioni uniche sulle procedure di aggiudicazione (settori speciali)',
    tema: 'Settori speciali',
    descrizione:
      'Obbligo di relazione sulle procedure aggiudicate nei settori speciali.',
    commi2016: '1-3',
    commi2023: '1-3',
  },
  {
    old: '140',
    oldTitle: 'Norme applicabili ai servizi sociali e altri servizi specifici',
    newArts: ['127', '173'],
    newTitle:
      'Servizi sociali e assimilati / Settori speciali (Artt. 127 e 173)',
    tema: 'Procedure',
    descrizione:
      'Il regime alleggerito per i servizi sociali si applica sia ai settori ordinari che a quelli speciali.',
    commi2016: '1-4',
    commi2023: '1-4',
  },
  {
    old: '141',
    oldTitle: 'Concorsi di progettazione e di idee nei settori speciali',
    newArts: ['46'],
    newTitle: 'Concorsi di progettazione',
    tema: 'Progettazione',
    descrizione:
      "I concorsi di progettazione nei settori speciali seguono le regole generali dell'art. 46.",
    commi2016: '1-4',
    commi2023: '1-6',
  },
  {
    old: '142',
    oldTitle: 'Pubblicazione degli avvisi e dei bandi nei settori speciali',
    newArts: ['164'],
    newTitle: "Redazione e modalita' di pubblicazione (settori speciali)",
    tema: 'Settori speciali',
    descrizione:
      'Obblighi di pubblicazione per i bandi e gli avvisi nei settori speciali.',
    commi2016: '1-4',
    commi2023: '1-3',
  },
  {
    old: '143',
    oldTitle: 'Appalti riservati per determinati servizi',
    newArts: ['61', '129'],
    newTitle: 'Contratti riservati / Appalti riservati (Artt. 61 e 129)',
    tema: 'Procedure',
    descrizione:
      'Riserva di taluni contratti a cooperative sociali e organizzazioni di inserimento lavorativo.',
    commi2016: '1-2',
    commi2023: '1-3',
  },
  {
    old: '144',
    oldTitle: 'Servizi di ristorazione',
    newArts: ['130'],
    newTitle: 'Servizi di ristorazione',
    tema: 'Procedure',
    descrizione:
      'Disciplina semplificata per i contratti aventi ad oggetto servizi di ristorazione collettiva.',
    commi2016: '1-2',
    commi2023: '1-2',
  },
  {
    old: '145',
    oldTitle:
      'Disciplina comune applicabile ai contratti nel settore dei beni culturali',
    newArts: ['132'],
    newTitle:
      'Disciplina comune applicabile ai contratti nel settore dei beni culturali',
    tema: 'Procedure',
    descrizione:
      'Norme speciali per gli appalti di restauro e lavori su beni culturali.',
    commi2016: '1-5',
    commi2023: '1-5',
  },
  {
    old: '146',
    oldTitle: 'Qualificazione per i beni culturali',
    newArts: ['133'],
    newTitle: 'Requisiti di qualificazione (beni culturali)',
    tema: 'Requisiti',
    descrizione:
      'Requisiti specifici di qualificazione per operatori che intervengono su beni culturali.',
    commi2016: '1-5',
    commi2023: '1-5',
  },
  {
    old: '147',
    oldTitle: 'Livelli e contenuti della progettazione per i beni culturali',
    newArts: ['41'],
    newTitle: 'Livelli e contenuti della progettazione',
    tema: 'Progettazione',
    descrizione:
      'Disciplina della progettazione per interventi su beni culturali.',
    commi2016: '1-5',
    commi2023: '1-15',
  },
  {
    old: '148',
    oldTitle: 'Affidamento dei contratti per i beni culturali',
    newArts: ['50'],
    newTitle: "Procedure per l'affidamento (sotto soglia)",
    tema: 'Procedure',
    descrizione:
      'Criteri di affidamento per contratti nel settore dei beni culturali.',
    commi2016: '1-4',
    commi2023: '1-4',
  },
  {
    old: '149',
    oldTitle: 'Varianti in corso di esecuzione per i beni culturali',
    newArts: ['120'],
    newTitle: 'Modifica dei contratti in corso di esecuzione',
    tema: 'Esecuzione',
    descrizione:
      'Le varianti per i beni culturali seguono le regole generali sulle modifiche contrattuali.',
    commi2016: '1-4',
    commi2023: '1-12',
  },
  {
    old: '150',
    oldTitle: 'Collaudo per i beni culturali',
    newArts: ['116'],
    newTitle: "Collaudo e verifica di conformita'",
    tema: 'Esecuzione',
    descrizione:
      'Il collaudo per lavori su beni culturali segue le regole generali con specifiche integrative.',
    commi2016: '1-3',
    commi2023: '1-7',
  },
  {
    old: '151',
    oldTitle:
      'Sponsorizzazioni e forme speciali di partenariato per beni culturali',
    newArts: ['134'],
    newTitle: 'Contratti gratuiti e forme speciali di partenariato',
    tema: 'PPP',
    descrizione:
      'Forme speciali di partenariato pubblico-privato per la valorizzazione dei beni culturali.',
    commi2016: '1-5',
    commi2023: '1-4',
  },
  {
    old: '152',
    oldTitle: 'Appalti dei concorsi di progettazione nei settori ordinari',
    newArts: ['46'],
    newTitle: 'Concorsi di progettazione',
    tema: 'Progettazione',
    descrizione:
      "I concorsi di progettazione nei settori ordinari sono disciplinati dall'art. 46.",
    commi2016: '1-4',
    commi2023: '1-6',
  },
  {
    old: '153',
    oldTitle: 'Bandi e avvisi per i concorsi di progettazione',
    newArts: ['46'],
    newTitle: 'Concorsi di progettazione',
    tema: 'Progettazione',
    descrizione:
      "Modalita' di pubblicazione dei bandi per concorsi di progettazione.",
    commi2016: '1-3',
    commi2023: '1-6',
  },
  {
    old: '154',
    oldTitle: 'Organizzazione dei concorsi di progettazione',
    newArts: ['46'],
    newTitle: 'Concorsi di progettazione',
    tema: 'Progettazione',
    descrizione:
      'Regole organizzative per lo svolgimento dei concorsi di progettazione.',
    commi2016: '1-5',
    commi2023: '1-6',
  },
  {
    old: '155',
    oldTitle: 'Commissione giudicatrice per i concorsi di progettazione',
    newArts: ['46'],
    newTitle: 'Concorsi di progettazione - commissione giudicatrice',
    tema: 'Progettazione',
    descrizione:
      'Composizione e funzionamento della commissione giudicatrice nei concorsi di progettazione.',
    commi2016: '1-5',
    commi2023: '1-6',
  },
  {
    old: '156',
    oldTitle: 'Concorso di idee',
    newArts: ['46'],
    newTitle: 'Concorsi di progettazione',
    tema: 'Progettazione',
    descrizione:
      "Il concorso di idee e' una modalita' del concorso di progettazione.",
    commi2016: '1-3',
    commi2023: '1-6',
  },
  {
    old: '157',
    oldTitle: 'Altri incarichi di progettazione e connessi',
    newArts: ['66', 'All. I.13'],
    newTitle: 'Operatori economici per servizi di ingegneria / Allegato I.13',
    tema: 'Progettazione',
    descrizione:
      'Incarichi professionali connessi alla progettazione (coordinamento sicurezza, direzione lavori).',
    commi2016: '1-6',
    commi2023: '1-4',
  },
  {
    old: '158',
    oldTitle: 'Servizi di ricerca e sviluppo',
    newArts: ['135'],
    newTitle: 'Servizi di ricerca e sviluppo',
    tema: 'Procedure',
    descrizione:
      'Appalti R&S: regime speciale con protezione dei risultati della ricerca.',
    commi2016: '1-3',
    commi2023: '1-3',
  },
  {
    old: '159',
    oldTitle: 'Difesa e sicurezza',
    newArts: ['136'],
    newTitle: 'Difesa e sicurezza',
    tema: 'Procedure',
    descrizione:
      'Appalti nel settore della difesa e sicurezza nazionale: regime speciale con deroghe.',
    commi2016: '1-5',
    commi2023: '1-5',
  },
  {
    old: '160',
    oldTitle: 'Contratti misti concernenti aspetti di difesa e sicurezza',
    newArts: ['137'],
    newTitle: 'Contratti misti concernenti aspetti di difesa e sicurezza',
    tema: 'Procedure',
    descrizione:
      "Disciplina dei contratti misti quando la componente difesa/sicurezza e' predominante.",
    commi2016: '1-4',
    commi2023: '1-4',
  },
  {
    old: '161',
    oldTitle:
      'Contratti e concorsi di progettazione aggiudicati in base a norme internazionali',
    newArts: ['138'],
    newTitle:
      'Contratti e concorsi di progettazione aggiudicati in base a norme internazionali',
    tema: 'Procedura',
    descrizione:
      'Contratti con organizzazioni internazionali o da esse finanziati.',
    commi2016: '1-3',
    commi2023: '1-2',
  },
  {
    old: '162',
    oldTitle: 'Contratti secretati',
    newArts: ['139'],
    newTitle: 'Contratti secretati',
    tema: 'Procedure',
    descrizione:
      'Appalti coperti da segreto di Stato o che richiedono speciali misure di sicurezza.',
    commi2016: '1-3',
    commi2023: '1-3',
  },
  {
    old: '163',
    oldTitle: 'Procedure in caso di somma urgenza e di protezione civile',
    newArts: ['140'],
    newTitle: 'Procedure in caso di somma urgenza e di protezione civile',
    tema: 'Procedure',
    descrizione:
      'Deroghe procedurali per i contratti aggiudicati in caso di somma urgenza o emergenza.',
    commi2016: '1-6',
    commi2023: '1-5',
  },
  {
    old: '164',
    oldTitle: 'Oggetto e ambito di applicazione delle concessioni',
    newArts: ['174', '176', '177'],
    newTitle:
      'Nozione / Oggetto e ambito / Contratto di concessione (Artt. 174-177)',
    tema: 'Concessioni',
    descrizione:
      'Le concessioni si caratterizzano per il trasferimento del rischio operativo al concessionario.',
    commi2016: '1-3',
    commi2023: '1-3',
  },
  {
    old: '165',
    oldTitle: 'Rischio ed equilibrio economico-finanziario nelle concessioni',
    newArts: ['176', '177'],
    newTitle:
      'Oggetto e ambito / Contratto di concessione e traslazione del rischio operativo',
    tema: 'Concessioni',
    descrizione:
      "Il rischio operativo e' l'elemento qualificante la concessione rispetto all'appalto.",
    commi2016: '1-3',
    commi2023: '1-3',
  },
  {
    old: '166',
    oldTitle: "Principio di libera amministrazione delle autorita' pubbliche",
    newArts: ['7'],
    newTitle: 'Principio di auto-organizzazione amministrativa',
    tema: 'Principi',
    descrizione:
      "La liberta' delle PA nella scelta delle modalita' di gestione e' nel principio di auto-organizzazione.",
    commi2016: '1-3',
    commi2023: '1-4',
  },
  {
    old: '167',
    oldTitle: 'Metodi di calcolo del valore stimato delle concessioni',
    newArts: ['179'],
    newTitle: 'Soglia e metodi di calcolo del valore stimato delle concessioni',
    tema: 'Concessioni',
    descrizione:
      'Criteri per il calcolo del valore stimato dei contratti di concessione.',
    commi2016: '1-4',
    commi2023: '1-4',
  },
  {
    old: '168',
    oldTitle: 'Durata delle concessioni',
    newArts: ['178'],
    newTitle: 'Durata della concessione',
    tema: 'Concessioni',
    descrizione:
      "La durata massima e' determinata in base al periodo di recupero degli investimenti.",
    commi2016: '1-2',
    commi2023: '1-3',
  },
  {
    old: '169',
    oldTitle: 'Contratti misti di concessioni',
    newArts: ['180'],
    newTitle: 'Contratti misti di concessione',
    tema: 'Concessioni',
    descrizione:
      "Disciplina dei contratti misti in cui una parte e' concessione.",
    commi2016: '1-4',
    commi2023: '1-4',
  },
  {
    old: '170',
    oldTitle: 'Requisiti tecnici e funzionali nelle concessioni',
    newArts: ['79', '185'],
    newTitle: 'Specifiche tecniche / Criteri di aggiudicazione (concessioni)',
    tema: 'Concessioni',
    descrizione: 'Requisiti tecnici e criteri di selezione nelle concessioni.',
    commi2016: '1-4',
    commi2023: '1-6',
  },
  {
    old: '171',
    oldTitle:
      'Garanzie procedurali nei criteri di aggiudicazione delle concessioni',
    newArts: ['185'],
    newTitle: 'Criteri di aggiudicazione (concessioni)',
    tema: 'Concessioni',
    descrizione:
      'I criteri di aggiudicazione delle concessioni devono rispettare par condicio e trasparenza.',
    commi2016: '1-3',
    commi2023: '1-6',
  },
  {
    old: '172',
    oldTitle:
      'Selezione e valutazione qualitativa dei candidati nelle concessioni',
    newArts: ['183'],
    newTitle: 'Procedimento di aggiudicazione delle concessioni',
    tema: 'Concessioni',
    descrizione:
      'Fasi della procedura di aggiudicazione e criteri per la selezione dei candidati.',
    commi2016: '1-5',
    commi2023: '1-6',
  },
  {
    old: '173',
    oldTitle: 'Termini, principi e criteri di aggiudicazione delle concessioni',
    newArts: ['183', '184', '185'],
    newTitle:
      'Procedimento / Termini / Criteri di aggiudicazione (concessioni)',
    tema: 'Concessioni',
    descrizione:
      'Procedura di aggiudicazione: termini, comunicazioni e criteri di scelta del concessionario.',
    commi2016: '1-7',
    commi2023: '1-6',
  },
  {
    old: '174',
    oldTitle: 'Subappalto nelle concessioni',
    newArts: ['188'],
    newTitle: 'Subappalto (concessioni)',
    tema: 'Concessioni',
    descrizione:
      'Regole sul subappalto applicabili ai contratti di concessione.',
    commi2016: '1-4',
    commi2023: '1-4',
  },
  {
    old: '175',
    oldTitle:
      'Modifica dei contratti di concessione durante il periodo di efficacia',
    newArts: ['189'],
    newTitle:
      'Modifica di contratti di concessione durante il periodo di efficacia',
    tema: 'Concessioni',
    descrizione:
      "Condizioni in cui e' possibile modificare una concessione senza nuova procedura.",
    commi2016: '1-7',
    commi2023: '1-8',
  },
  {
    old: '176',
    oldTitle:
      'Cessazione, revoca, risoluzione per inadempimento delle concessioni',
    newArts: ['190'],
    newTitle: 'Risoluzione e recesso (concessioni)',
    tema: 'Concessioni',
    descrizione:
      "Cause e modalita' di risoluzione dei contratti di concessione.",
    commi2016: '1-5',
    commi2023: '1-5',
  },
  {
    old: '177',
    oldTitle: 'Affidamenti dei concessionari',
    newArts: ['186'],
    newTitle: 'Affidamenti dei concessionari',
    tema: 'Concessioni',
    descrizione:
      'I concessionari sono tenuti ad aggiudicare tramite gara una quota dei contratti a terzi.',
    commi2016: '1-5',
    commi2023: '1-5',
  },
  {
    old: '178',
    oldTitle: 'Norme in materia di concessioni autostradali',
    newArts: ['192'],
    newTitle: 'Revisione del contratto di concessione',
    tema: 'Concessioni',
    descrizione:
      'Norme speciali per le concessioni autostradali, inclusa la revisione del piano economico-finanziario.',
    commi2016: '1-8',
    commi2023: '1-5',
  },
  {
    old: '179',
    oldTitle: 'Disciplina comune applicabile al PPP',
    newArts: ['193'],
    newTitle: 'Procedura di affidamento (PPP)',
    tema: 'PPP',
    descrizione:
      'Disciplina comune alle forme di partenariato pubblico privato.',
    commi2016: '1-5',
    commi2023: '1-7',
  },
  {
    old: '180',
    oldTitle: 'Partenariato pubblico privato',
    newArts: ['193', '196', '197'],
    newTitle: 'Procedura di affidamento / Definizione e disciplina del PPP',
    tema: 'PPP',
    descrizione:
      'Forme di cooperazione tra PA e privati: project financing, concessioni di costruzione e gestione, leasing.',
    commi2016: '1-5',
    commi2023: '1-7',
  },
  {
    old: '181',
    oldTitle: 'Procedure di affidamento del PPP',
    newArts: ['193'],
    newTitle: 'Procedura di affidamento (PPP)',
    tema: 'PPP',
    descrizione: "Procedure di gara per l'affidamento dei contratti di PPP.",
    commi2016: '1-7',
    commi2023: '1-7',
  },
  {
    old: '182',
    oldTitle: 'Finanziamento del progetto nel PPP',
    newArts: ['199'],
    newTitle: 'Privilegio sui crediti e ulteriori garanzie (PPP)',
    tema: 'PPP',
    descrizione:
      'Strumenti di finanziamento e garanzie per i contratti di PPP.',
    commi2016: '1-5',
    commi2023: '1-3',
  },
  {
    old: '183',
    oldTitle: 'Finanza di progetto',
    newArts: ['193', '194', '195', '196', '197', '198', '199'],
    newTitle: 'Finanza di progetto (Artt. 193-199)',
    tema: 'PPP',
    descrizione:
      "Il project financing e' riorganizzato in un Capo autonomo con distinzione tra iniziativa privata e su progetto in programmazione.",
    commi2016: '1-17',
    commi2023: 'Artt. 193-199',
  },
  {
    old: '184',
    oldTitle: "Societa' di progetto",
    newArts: ['194'],
    newTitle: "Societa' di scopo (PPP)",
    tema: 'PPP',
    descrizione:
      "Societa' appositamente costituita per la realizzazione e gestione dell'opera in regime di PPP.",
    commi2016: '1-5',
    commi2023: '1-4',
  },
  {
    old: '185',
    oldTitle:
      "Emissione di obbligazioni e titoli di debito da parte delle societa' di progetto",
    newArts: ['195'],
    newTitle: "Obbligazioni delle societa' di scopo",
    tema: 'PPP',
    descrizione:
      "Possibilita' per le societa' di progetto di emettere obbligazioni per il finanziamento dell'opera.",
    commi2016: '1-4',
    commi2023: '1-3',
  },
  {
    old: '186',
    oldTitle: 'Privilegio sui crediti',
    newArts: ['199'],
    newTitle: 'Privilegio sui crediti e ulteriori garanzie (PPP)',
    tema: 'PPP',
    descrizione:
      'Privilegio speciale a favore dei finanziatori del PPP sui crediti vantati verso la PA.',
    commi2016: '1-3',
    commi2023: '1-3',
  },
  {
    old: '187',
    oldTitle: "Locazione finanziaria di opere pubbliche o di pubblica utilita'",
    newArts: ['196', '197'],
    newTitle: 'Definizione e disciplina (PPP)',
    tema: 'PPP',
    descrizione:
      'Il leasing in costruendo come forma di PPP per la realizzazione e gestione di opere pubbliche.',
    commi2016: '1-5',
    commi2023: '1-5',
  },
  {
    old: '188',
    oldTitle: "Contratto di disponibilita'",
    newArts: ['196'],
    newTitle: 'Definizione e disciplina (PPP)',
    tema: 'PPP',
    descrizione:
      "Contratto con cui il privato si obbliga a costruire e mettere a disposizione della PA un'opera.",
    commi2016: '1-8',
    commi2023: '1-5',
  },
  {
    old: '189',
    oldTitle: "Interventi di sussidiarieta' orizzontale",
    newArts: ['6'],
    newTitle: "Principi di solidarieta' e di sussidiarieta' orizzontale",
    tema: 'Principi',
    descrizione:
      "Gli interventi di sussidiarieta' orizzontale con gli enti del Terzo settore sono nell'art. 6.",
    commi2016: '1-3',
    commi2023: '1',
  },
  {
    old: '190',
    oldTitle: 'Baratto amministrativo',
    newArts: ['134'],
    newTitle: 'Contratti gratuiti e forme speciali di partenariato',
    tema: 'PPP',
    descrizione:
      "Il baratto amministrativo e' ricondotto alle forme speciali di partenariato.",
    commi2016: '1-5',
    commi2023: '1-4',
  },
  {
    old: '191',
    oldTitle: 'Cessione di immobili in cambio di opere',
    newArts: ['202'],
    newTitle: 'Cessione di immobili in cambio di opere',
    tema: 'PPP',
    descrizione:
      "La cessione di beni immobili della PA come corrispettivo dell'opera realizzata dal privato.",
    commi2016: '1-5',
    commi2023: '1-3',
  },
  {
    old: '192',
    oldTitle: 'Regime speciale degli affidamenti in house',
    newArts: ['7'],
    newTitle: 'Principio di auto-organizzazione amministrativa',
    tema: 'Principi',
    descrizione:
      "L'affidamento in house e' ora nel principio di auto-organizzazione della PA (art. 7).",
    commi2016: '1-4',
    commi2023: '1-4',
  },
  {
    old: '193',
    oldTitle: "Societa' pubblica di progetto",
    newArts: ['194'],
    newTitle: "Societa' di scopo (PPP)",
    tema: 'PPP',
    descrizione:
      "Societa' a partecipazione pubblica per la realizzazione di infrastrutture e servizi in PPP.",
    commi2016: '1-3',
    commi2023: '1-4',
  },
  {
    old: '194',
    oldTitle: 'Affidamento a contraente generale',
    newArts: ['204'],
    newTitle: 'Contraente generale',
    tema: 'Procedure',
    descrizione:
      'Disciplina del contraente generale per la realizzazione di grandi opere pubbliche.',
    commi2016: '1-6',
    commi2023: '1-6',
  },
  {
    old: '195',
    oldTitle: 'Procedure di aggiudicazione del contraente generale',
    newArts: ['205'],
    newTitle: 'Procedure di aggiudicazione del contraente generale',
    tema: 'Procedure',
    descrizione:
      'Procedura per la selezione del contraente generale (global service per grandi infrastrutture).',
    commi2016: '1-7',
    commi2023: '1-5',
  },
  {
    old: '196',
    oldTitle: "Controlli sull'esecuzione e collaudo del contraente generale",
    newArts: ['206'],
    newTitle: "Controlli sull'esecuzione e collaudo (contraente generale)",
    tema: 'Procedure',
    descrizione:
      "Attivita' di controllo e collaudo specifiche per i contratti con contraente generale.",
    commi2016: '1-4',
    commi2023: '1-4',
  },
  {
    old: '197',
    oldTitle: 'Sistema di qualificazione del contraente generale',
    newArts: ['207'],
    newTitle: 'Sistema di qualificazione del contraente generale',
    tema: 'Procedure',
    descrizione:
      'Qualificazione specifica dei soggetti che operano come contraenti generali.',
    commi2016: '1-6',
    commi2023: '1-5',
  },
  {
    old: '198',
    oldTitle: 'Norme di partecipazione alla gara del contraente generale',
    newArts: ['205'],
    newTitle: 'Procedure di aggiudicazione del contraente generale',
    tema: 'Procedure',
    descrizione:
      'Regole di partecipazione alla gara per il contraente generale.',
    commi2016: '1-5',
    commi2023: '1-5',
  },
  {
    old: '199',
    oldTitle: 'Gestione del sistema di qualificazione del contraente generale',
    newArts: ['207'],
    newTitle: 'Sistema di qualificazione del contraente generale',
    tema: 'Procedure',
    descrizione: 'Gestione del registro dei contraenti generali qualificati.',
    commi2016: '1-4',
    commi2023: '1-5',
  },
  {
    old: '200',
    oldTitle: 'Disposizioni generali infrastrutture strategiche',
    newArts: ['39'],
    newTitle: 'Programmazione e progettazione delle infrastrutture strategiche',
    tema: 'Programmazione',
    descrizione:
      'Disciplina speciale per la programmazione e realizzazione delle infrastrutture strategiche e di preminente interesse nazionale.',
    commi2016: '1-5',
    commi2023: '1-8',
  },
  {
    old: '201',
    oldTitle: 'Strumenti di pianificazione e programmazione infrastrutture',
    newArts: ['39'],
    newTitle: 'Programmazione e progettazione delle infrastrutture strategiche',
    tema: 'Programmazione',
    descrizione:
      'Piani e programmi per le infrastrutture strategiche (Piano Generale dei Trasporti ecc.).',
    commi2016: '1-5',
    commi2023: '1-8',
  },
  {
    old: '202',
    oldTitle: 'Finanziamento e riprogrammazione risorse per le infrastrutture',
    newArts: ['39'],
    newTitle: 'Programmazione e progettazione delle infrastrutture strategiche',
    tema: 'Programmazione',
    descrizione:
      'Disciplina del finanziamento e riprogrammazione delle risorse per le infrastrutture strategiche.',
    commi2016: '1-6',
    commi2023: '1-8',
  },
  {
    old: '203',
    oldTitle:
      'Monitoraggio delle infrastrutture e degli insediamenti prioritari',
    newArts: ['39'],
    newTitle: 'Programmazione e progettazione delle infrastrutture strategiche',
    tema: 'Programmazione',
    descrizione:
      "Attivita' di monitoraggio sullo stato di avanzamento delle infrastrutture strategiche.",
    commi2016: '1-5',
    commi2023: '1-8',
  },
  {
    old: '204',
    oldTitle: 'Ricorsi giurisdizionali',
    newArts: ['209'],
    newTitle: 'Modifiche al codice del processo amministrativo',
    tema: 'Contenzioso',
    descrizione:
      'Tutela giurisdizionale nelle controversie di appalto davanti al TAR e al Consiglio di Stato.',
    commi2016: '1',
    commi2023: '1',
  },
  {
    old: '205',
    oldTitle: 'Accordo bonario per i lavori',
    newArts: ['210'],
    newTitle: 'Accordo bonario per i lavori',
    tema: 'Contenzioso',
    descrizione:
      "Procedura stragiudiziale obbligatoria per riserve iscritte nel registro di contabilita'. Resa piu' snella.",
    commi2016: '1-12',
    commi2023: '1-8',
  },
  {
    old: '206',
    oldTitle: 'Accordo bonario per i servizi e le forniture',
    newArts: ['211'],
    newTitle: 'Accordo bonario per i servizi e le forniture',
    tema: 'Contenzioso',
    descrizione:
      'Procedura di accordo bonario estesa anche ai contratti di servizi e forniture.',
    commi2016: '1-3',
    commi2023: '1-3',
  },
  {
    old: '208',
    oldTitle: 'Transazione',
    newArts: ['212'],
    newTitle: 'Transazione',
    tema: 'Contenzioso',
    descrizione:
      'Accordo transattivo tra SA e contraente per definire le controversie in via stragiudiziale.',
    commi2016: '1-3',
    commi2023: '1-3',
  },
  {
    old: '209',
    oldTitle: 'Arbitrato',
    newArts: ['213'],
    newTitle: 'Arbitrato',
    tema: 'Contenzioso',
    descrizione:
      "L'arbitrato rituale rimane strumento alternativo per le controversie. Piu' trasparente con Camera arbitrale ANAC.",
    commi2016: '1-16',
    commi2023: '1-12',
  },
  {
    old: '210',
    oldTitle: 'Camera arbitrale, albo degli arbitri ed elenco dei segretari',
    newArts: ['214'],
    newTitle: 'Camera arbitrale, albo degli arbitri ed elenco dei segretari',
    tema: 'Contenzioso',
    descrizione:
      "La Camera arbitrale presso ANAC gestisce l'albo degli arbitri e il procedimento arbitrale.",
    commi2016: '1-6',
    commi2023: '1-8',
  },
  {
    old: '211',
    oldTitle: "Pareri di precontenzioso dell'ANAC",
    newArts: ['220'],
    newTitle: "Pareri di precontenzioso e legittimazione ad agire dell'ANAC",
    tema: 'Governance',
    descrizione:
      'ANAC emette pareri vincolanti su richiesta delle SA o degli OE in caso di controversia.',
    commi2016: '1-3',
    commi2023: '1-6',
  },
  {
    old: '212',
    oldTitle: 'Indirizzo e coordinamento del Ministero delle Infrastrutture',
    newArts: ['221'],
    newTitle: 'Indirizzo, coordinamento e monitoraggio - Cabina di regia',
    tema: 'Governance',
    descrizione:
      "Cabina di regia interministeriale per il coordinamento e il monitoraggio dell'attuazione del codice.",
    commi2016: '1-3',
    commi2023: '1-5',
  },
  {
    old: '213',
    oldTitle: "Autorita' Nazionale Anticorruzione (ANAC)",
    newArts: ['222'],
    newTitle: "Autorita' Nazionale Anticorruzione (ANAC)",
    tema: 'Governance',
    descrizione:
      "Poteri dell'ANAC: vigilanza, ispezioni, sanzioni, atti di regolazione (linee guida, regolamenti).",
    commi2016: '1-18',
    commi2023: '1-10',
  },
  {
    old: '214',
    oldTitle:
      'Ministero delle infrastrutture e dei trasporti e struttura tecnica di missione',
    newArts: ['223'],
    newTitle:
      'Ministero delle infrastrutture e dei trasporti e struttura tecnica di missione',
    tema: 'Governance',
    descrizione:
      "Ruolo del MIT nell'attuazione del codice, con struttura tecnica di supporto dedicata.",
    commi2016: '1-5',
    commi2023: '1-4',
  },
  {
    old: '215',
    oldTitle: 'Consiglio superiore dei lavori pubblici',
    newArts: ['47'],
    newTitle: 'Consiglio Superiore dei Lavori Pubblici',
    tema: 'Governance',
    descrizione:
      'Organo consultivo tecnico del MIT. Pareri obbligatori su progetti di opere pubbliche rilevanti.',
    commi2016: '1-5',
    commi2023: '1-4',
  },
  {
    old: '216',
    oldTitle: 'Disposizioni transitorie e di coordinamento',
    newArts: ['225', '226'],
    newTitle: 'Disposizioni transitorie / Abrogazioni e disposizioni finali',
    tema: 'Disposizioni finali',
    descrizione:
      "Il D.Lgs. 50/2016 e' abrogato dal 1\u00b0 luglio 2023. Norma ponte per contratti gia' avviati.",
    commi2016: '1-56',
    commi2023: '1-5',
  },
  {
    old: '217',
    oldTitle: 'Abrogazioni',
    newArts: ['226'],
    newTitle: 'Abrogazioni e disposizioni finali',
    tema: 'Disposizioni finali',
    descrizione:
      "Elenco delle disposizioni abrogate con l'entrata in vigore del nuovo codice.",
    commi2016: '1',
    commi2023: '1',
  },
  {
    old: '218',
    oldTitle: 'Aggiornamenti',
    newArts: ['227'],
    newTitle: 'Aggiornamenti',
    tema: 'Disposizioni finali',
    descrizione: 'Procedura per gli aggiornamenti del codice e degli allegati.',
    commi2016: '1',
    commi2023: '1',
  },
  {
    old: '219',
    oldTitle: 'Clausola di invarianza finanziaria',
    newArts: ['228'],
    newTitle: 'Clausola di invarianza finanziaria',
    tema: 'Disposizioni finali',
    descrizione:
      "Dall'attuazione del codice non devono derivare nuovi o maggiori oneri a carico della finanza pubblica.",
    commi2016: '1',
    commi2023: '1',
  },
  {
    old: '220',
    oldTitle: 'Entrata in vigore',
    newArts: ['229'],
    newTitle: 'Entrata in vigore',
    tema: 'Disposizioni finali',
    descrizione:
      "Il nuovo codice e' entrato in vigore il 1\u00b0 aprile 2023, con applicazione piena dal 1\u00b0 luglio 2023.",
    commi2016: '1',
    commi2023: '1',
  },
];

const TEMI = [...new Set(MAPPING.map((m) => m.tema))].sort();
const TAG_COLORS = {
  Principi: '#1a5276',
  Ambito: '#117a65',
  Definizioni: '#7d6608',
  Trasparenza: '#1f618d',
  Digitalizzazione: '#6c3483',
  Organizzazione: '#784212',
  Procedure: '#922b21',
  Soglie: '#1e8449',
  'Sotto soglia': '#196f3d',
  Progettazione: '#154360',
  Programmazione: '#0e6655',
  Operatori: '#4a235a',
  Strumenti: '#7e5109',
  Aggiudicazione: '#641e16',
  Requisiti: '#1a237e',
  Esecuzione: '#880e4f',
  Garanzie: '#4e342e',
  Concessioni: '#1b5e20',
  PPP: '#006064',
  'Settori speciali': '#37474f',
  Contenzioso: '#b71c1c',
  Governance: '#212121',
  'Disposizioni finali': '#424242',
};

export default function App() {
  const [search, setSearch] = useState('');
  const [selectedTema, setSelectedTema] = useState('Tutti');
  const [modal, setModal] = useState(null);
  const [artView, setArtView] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  const filtered = useMemo(
    () =>
      MAPPING.filter((m) => {
        const ok = selectedTema === 'Tutti' || m.tema === selectedTema;
        const s = search.toLowerCase();
        return (
          ok &&
          (!s ||
            m.old.includes(s) ||
            m.oldTitle.toLowerCase().includes(s) ||
            m.newArts.join(' ').includes(s) ||
            m.newTitle.toLowerCase().includes(s) ||
            m.descrizione.toLowerCase().includes(s))
        );
      }),
    [search, selectedTema]
  );

  const openArt = (side, num) => {
    const db = side === '2016' ? ARTS_2016 : ARTS_2023;
    const art = db[num];
    if (art) setArtView({ side, num, title: art.title, text: art.text });
    else
      setArtView({
        side,
        num,
        title: `Art. ${num}`,
        text: `Testo dell'Art. ${num} del ${
          side === '2016' ? 'D.Lgs. 50/2016' : 'D.Lgs. 36/2023'
        } non disponibile in questa versione.`,
      });
  };

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') {
        setArtView(null);
        setShowInfo(false);
        setModal(null);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div
      style={{
        fontFamily: "'Crimson Pro',Georgia,serif",
        background: '#f4f1eb',
        minHeight: '100vh',
        color: '#1c1c1c',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,300;0,400;0,600;0,700;1,400&family=DM+Mono:wght@300;400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        .hdr{background:linear-gradient(135deg,#0d2137 0%,#1a3a5c 50%,#0d2137 100%);position:relative;overflow:hidden}
        .hdr::before{content:'';position:absolute;inset:0;background:repeating-linear-gradient(45deg,transparent,transparent 30px,rgba(255,255,255,.015) 30px,rgba(255,255,255,.015) 60px)}
        .tag{display:inline-block;padding:2px 8px;border-radius:2px;font-size:10px;font-family:'DM Mono',monospace;font-weight:500;letter-spacing:.05em;text-transform:uppercase;color:white}
        .ab{display:inline-flex;align-items:center;gap:4px;font-family:'DM Mono',monospace;font-size:11px;font-weight:500;padding:2px 7px;border-radius:3px;white-space:nowrap;cursor:pointer;border:none;transition:opacity .15s}
        .ab:hover{opacity:.8}
        .ab16{background:#c0392b;color:white}
        .ab23{background:#1a5276;color:white}
        .ab-txt{background:transparent;color:#1a5276;border:1px solid #1a5276!important;padding:1px 6px}
        tr:hover td{background:#e8e2d9!important;cursor:pointer}
        .sel td{background:#dce7f0!important}
        input[type=text]{width:100%;padding:10px 16px;border:1.5px solid #b8a99a;border-radius:4px;font-family:'Crimson Pro',Georgia,serif;font-size:16px;background:white;outline:none;transition:border-color .2s}
        input[type=text]:focus{border-color:#1a3a5c}
        select{padding:10px 14px;border:1.5px solid #b8a99a;border-radius:4px;font-family:'Crimson Pro',Georgia,serif;font-size:15px;background:white;outline:none;cursor:pointer}
        th{position:sticky;top:0;background:#1a3a5c;color:#e8d5b0;padding:11px 13px;text-align:left;font-family:'DM Mono',monospace;font-size:10px;font-weight:500;letter-spacing:.08em;text-transform:uppercase;border-bottom:2px solid #c0a060;z-index:10}
        td{padding:9px 13px;border-bottom:1px solid #d5ccc0;vertical-align:middle;font-size:13px;line-height:1.5}
        .overlay{position:fixed;inset:0;background:rgba(13,33,55,.7);z-index:100;display:flex;align-items:flex-start;justify-content:center;padding:40px 16px;overflow-y:auto;backdrop-filter:blur(3px)}
        .modal{background:white;border-radius:6px;width:100%;max-width:760px;box-shadow:0 20px 60px rgba(0,0,0,.3);position:relative;overflow:hidden}
        .modal-hdr{padding:20px 24px 16px;border-bottom:1px solid #e0d8d0}
        .modal-body{padding:24px;max-height:65vh;overflow-y:auto;font-size:14px;line-height:1.9;color:#1a1a1a;white-space:pre-wrap;font-family:'Crimson Pro',Georgia,serif}
        .modal-body::-webkit-scrollbar{width:6px}
        .modal-body::-webkit-scrollbar-track{background:#f4f1eb}
        .modal-body::-webkit-scrollbar-thumb{background:#b8a99a;border-radius:3px}
        .close-btn{position:absolute;top:16px;right:16px;background:#1a3a5c;color:#e8d5b0;border:none;width:32px;height:32px;border-radius:50%;font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;line-height:1}
        .badge-stat{background:rgba(255,255,255,.08);border:1px solid rgba(192,160,96,.4);border-radius:4px;padding:10px 18px;text-align:center}
        @media(max-width:700px){th,td{padding:7px 9px}.overlay{padding:16px 8px}}
      `}</style>

      {/* HEADER */}
      <div className="hdr" style={{ padding: '36px 32px 28px' }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div
            style={{
              fontFamily: "'DM Mono',monospace",
              fontSize: 11,
              letterSpacing: '.15em',
              color: '#c0a060',
              textTransform: 'uppercase',
              marginBottom: 10,
            }}
          >
            Strumento di Conversione Normativa
          </div>
          <h1
            style={{
              fontSize: 'clamp(20px,4vw,34px)',
              fontWeight: 300,
              color: '#f0e6d0',
              lineHeight: 1.2,
              marginBottom: 6,
            }}
          >
            Codice dei Contratti Pubblici
          </h1>
          <h2
            style={{
              fontSize: 'clamp(13px,2.5vw,19px)',
              fontWeight: 600,
              color: '#e8c87a',
              letterSpacing: '.02em',
            }}
          >
            D.Lgs. 50/2016 ↔ D.Lgs. 36/2023
          </h2>
          <p
            style={{
              marginTop: 12,
              color: '#9ab0c8',
              fontSize: 13,
              fontFamily: "'DM Mono',monospace",
              lineHeight: 1.6,
            }}
          >
            Tavola di raffronto articolo per articolo · Clicca una riga per
            leggere il testo degli articoli
          </p>
          <div
            style={{
              display: 'flex',
              gap: 14,
              marginTop: 20,
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            <div className="badge-stat">
              <div style={{ color: '#e8c87a', fontSize: 22, fontWeight: 700 }}>
                {MAPPING.length}
              </div>
              <div
                style={{
                  color: '#9ab0c8',
                  fontSize: 10,
                  fontFamily: "'DM Mono',monospace",
                  letterSpacing: '.05em',
                }}
              >
                ARTICOLI MAPPATI
              </div>
            </div>
            <div className="badge-stat">
              <div style={{ color: '#e8c87a', fontSize: 22, fontWeight: 700 }}>
                {TEMI.length}
              </div>
              <div
                style={{
                  color: '#9ab0c8',
                  fontSize: 10,
                  fontFamily: "'DM Mono',monospace",
                  letterSpacing: '.05em',
                }}
              >
                AREE TEMATICHE
              </div>
            </div>
            <div className="badge-stat">
              <div
                style={{
                  color: '#c0392b',
                  fontSize: 13,
                  fontWeight: 700,
                  fontFamily: "'DM Mono',monospace",
                }}
              >
                D.Lgs. 50/2016
              </div>
              <div
                style={{
                  color: '#9ab0c8',
                  fontSize: 10,
                  fontFamily: "'DM Mono',monospace",
                }}
              >
                214 Articoli estratti
              </div>
            </div>
            <div className="badge-stat">
              <div
                style={{
                  color: '#1a7bbf',
                  fontSize: 13,
                  fontWeight: 700,
                  fontFamily: "'DM Mono',monospace",
                }}
              >
                D.Lgs. 36/2023
              </div>
              <div
                style={{
                  color: '#9ab0c8',
                  fontSize: 10,
                  fontFamily: "'DM Mono',monospace",
                }}
              >
                225 Articoli estratti
              </div>
            </div>
            <button
              onClick={() => setShowInfo(true)}
              style={{
                marginLeft: 'auto',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(255,255,255,0.1)',
                border: '1.5px solid rgba(232,200,122,0.6)',
                color: '#e8c87a',
                padding: '10px 20px',
                borderRadius: 4,
                cursor: 'pointer',
                fontFamily: "'DM Mono',monospace",
                fontSize: 12,
                letterSpacing: '.08em',
                textTransform: 'uppercase',
                transition: 'all .2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(232,200,122,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              }}
            >
              ℹ️ Info &amp; Contatti
            </button>
          </div>
        </div>
      </div>

      {/* CONTROLS */}
      <div
        style={{
          background: '#eae4da',
          borderBottom: '1px solid #c8bfb0',
          padding: '14px 32px',
          display: 'flex',
          gap: 10,
          flexWrap: 'wrap',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 20,
        }}
      >
        <div style={{ flex: '1 1 260px' }}>
          <input
            type="text"
            placeholder="Cerca per numero articolo, parola chiave, titolo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          value={selectedTema}
          onChange={(e) => setSelectedTema(e.target.value)}
        >
          <option value="Tutti">Tutti i temi ({MAPPING.length})</option>
          {TEMI.map((t) => (
            <option key={t} value={t}>
              {t} ({MAPPING.filter((m) => m.tema === t).length})
            </option>
          ))}
        </select>
        {(search || selectedTema !== 'Tutti') && (
          <button
            onClick={() => {
              setSearch('');
              setSelectedTema('Tutti');
            }}
            style={{
              background: '#c0392b',
              color: 'white',
              border: 'none',
              padding: '8px 14px',
              borderRadius: 3,
              fontFamily: "'DM Mono',monospace",
              fontSize: 11,
              cursor: 'pointer',
              letterSpacing: '.05em',
            }}
          >
            × RESET
          </button>
        )}
        <div
          style={{
            fontFamily: "'DM Mono',monospace",
            fontSize: 11,
            color: '#7a6a5a',
            marginLeft: 'auto',
          }}
        >
          {filtered.length} / {MAPPING.length} voci
        </div>
      </div>

      {/* TABLE */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ width: 90 }}>Art. 50/2016</th>
              <th>Titolo D.Lgs. 50/2016</th>
              <th style={{ width: 90 }}>Art. 36/2023</th>
              <th>Titolo D.Lgs. 36/2023</th>
              <th style={{ width: 70 }}>Commi 2016</th>
              <th style={{ width: 70 }}>Commi 2023</th>
              <th style={{ width: 90 }}>Tema</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  style={{
                    textAlign: 'center',
                    padding: '40px',
                    color: '#888',
                    fontStyle: 'italic',
                  }}
                >
                  Nessun risultato. Modifica i criteri di ricerca.
                </td>
              </tr>
            )}
            {filtered.map((row, idx) => (
              <tr
                key={row.old + row.oldTitle}
                style={{ background: idx % 2 === 0 ? '#f9f6f2' : 'white' }}
                onClick={() => setModal(row)}
              >
                <td>
                  <button
                    className="ab ab16"
                    onClick={(e) => {
                      e.stopPropagation();
                      openArt('2016', row.old);
                    }}
                    title="Leggi testo articolo"
                  >
                    📕 Art. {row.old}
                  </button>
                </td>
                <td style={{ fontWeight: 500 }}>{row.oldTitle}</td>
                <td>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                    {row.newArts.map((a, i) =>
                      a ? (
                        <button
                          key={i}
                          className="ab ab23"
                          onClick={(e) => {
                            e.stopPropagation();
                            openArt('2023', a);
                          }}
                          title="Leggi testo articolo"
                        >
                          📘 Art. {a}
                        </button>
                      ) : (
                        <span
                          key={i}
                          style={{
                            fontFamily: "'DM Mono',monospace",
                            fontSize: 11,
                            color: '#888',
                          }}
                        >
                          —
                        </span>
                      )
                    )}
                  </div>
                </td>
                <td style={{ fontSize: 12, color: '#444' }}>{row.newTitle}</td>
                <td
                  style={{
                    fontFamily: "'DM Mono',monospace",
                    fontSize: 11,
                    color: '#c0392b',
                  }}
                >
                  {row.commi2016}
                </td>
                <td
                  style={{
                    fontFamily: "'DM Mono',monospace",
                    fontSize: 11,
                    color: '#1a5276',
                  }}
                >
                  {row.commi2023}
                </td>
                <td>
                  <span
                    className="tag"
                    style={{ background: TAG_COLORS[row.tema] || '#555' }}
                  >
                    {row.tema}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* LEGENDA TEMI */}
      <div
        style={{
          margin: '28px 32px',
          padding: '18px',
          background: 'white',
          border: '1px solid #d5ccc0',
          borderRadius: 4,
        }}
      >
        <div
          style={{
            fontFamily: "'DM Mono',monospace",
            fontSize: 10,
            textTransform: 'uppercase',
            letterSpacing: '.1em',
            color: '#7a6a5a',
            marginBottom: 10,
          }}
        >
          Filtro per Area Tematica
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {TEMI.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTema(selectedTema === t ? 'Tutti' : t)}
              style={{
                background: selectedTema === t ? TAG_COLORS[t] : 'transparent',
                color: selectedTema === t ? 'white' : TAG_COLORS[t] || '#333',
                border: `1.5px solid ${TAG_COLORS[t] || '#333'}`,
                padding: '3px 10px',
                borderRadius: 3,
                fontSize: 10,
                fontFamily: "'DM Mono',monospace",
                letterSpacing: '.04em',
                cursor: 'pointer',
                textTransform: 'uppercase',
                transition: 'all .15s',
              }}
            >
              {t} ({MAPPING.filter((m) => m.tema === t).length})
            </button>
          ))}
        </div>
      </div>

      {/* NOTE INFO */}
      <div
        style={{
          margin: '0 32px 40px',
          padding: '14px 18px',
          background: '#fff8e8',
          border: '1px solid #e8c87a',
          borderRadius: 4,
          fontFamily: "'DM Mono',monospace",
          fontSize: 11,
          color: '#7a5a00',
          lineHeight: 1.8,
        }}
      >
        <strong>Come usare l'app:</strong> Clicca sul badge rosso 📕{' '}
        <strong>Art. N</strong> per leggere il testo del vecchio codice, sul
        badge blu 📘 <strong>Art. N</strong> per il nuovo codice · Clicca su una
        riga per la scheda di raffronto completa · Usa la barra di ricerca o i
        filtri tematici per navigare · Premi{' '}
        <kbd
          style={{ background: '#e8d0a0', padding: '1px 5px', borderRadius: 2 }}
        >
          ESC
        </kbd>{' '}
        per chiudere la finestra
      </div>

      {/* MODAL RIGA – scheda di raffronto */}
      {modal && !artView && (
        <div className="overlay" onClick={() => setModal(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hdr" style={{ background: '#1a3a5c' }}>
              <div style={{ paddingRight: 40 }}>
                <span
                  className="tag"
                  style={{
                    background: TAG_COLORS[modal.tema] || '#555',
                    marginBottom: 8,
                    display: 'inline-block',
                  }}
                >
                  {modal.tema}
                </span>
                <div
                  style={{
                    color: '#e8d5b0',
                    fontSize: 18,
                    fontWeight: 300,
                    lineHeight: 1.3,
                  }}
                >
                  {modal.descrizione}
                </div>
              </div>
              <button className="close-btn" onClick={() => setModal(null)}>
                ×
              </button>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 0,
              }}
            >
              {/* OLD */}
              <div
                style={{
                  background: '#fff5f5',
                  borderRight: '1px solid #f5c6c6',
                  padding: 20,
                }}
              >
                <div
                  style={{
                    fontFamily: "'DM Mono',monospace",
                    fontSize: 9,
                    textTransform: 'uppercase',
                    letterSpacing: '.1em',
                    color: '#c0392b',
                    marginBottom: 10,
                  }}
                >
                  📕 D.Lgs. 50/2016 — Vecchio Codice
                </div>
                <button
                  className="ab ab16"
                  style={{
                    marginBottom: 10,
                    fontSize: 13,
                    padding: '5px 12px',
                  }}
                  onClick={() => openArt('2016', modal.old)}
                >
                  Leggi Art. {modal.old} →
                </button>
                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 6 }}>
                  {modal.oldTitle}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Mono',monospace",
                    fontSize: 11,
                    color: '#c0392b',
                  }}
                >
                  Commi: {modal.commi2016}
                </div>
              </div>
              {/* NEW */}
              <div style={{ background: '#f0f6ff', padding: 20 }}>
                <div
                  style={{
                    fontFamily: "'DM Mono',monospace",
                    fontSize: 9,
                    textTransform: 'uppercase',
                    letterSpacing: '.1em',
                    color: '#1a5276',
                    marginBottom: 10,
                  }}
                >
                  📘 D.Lgs. 36/2023 — Nuovo Codice
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 5,
                    marginBottom: 10,
                  }}
                >
                  {modal.newArts.map(
                    (a, i) =>
                      a && (
                        <button
                          key={i}
                          className="ab ab23"
                          style={{ fontSize: 13, padding: '5px 12px' }}
                          onClick={() => openArt('2023', a)}
                        >
                          Leggi Art. {a} →
                        </button>
                      )
                  )}
                </div>
                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 6 }}>
                  {modal.newTitle}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Mono',monospace",
                    fontSize: 11,
                    color: '#1a5276',
                  }}
                >
                  Commi: {modal.commi2023}
                </div>
              </div>
            </div>
            <div
              style={{
                padding: '16px 20px',
                borderTop: '1px solid #e0d8d0',
                background: '#fafaf8',
              }}
            >
              <div
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: 10,
                  color: '#888',
                  marginBottom: 4,
                  textTransform: 'uppercase',
                  letterSpacing: '.06em',
                }}
              >
                Nota di raffronto
              </div>
              <div style={{ fontSize: 14, color: '#333', lineHeight: 1.6 }}>
                {modal.descrizione}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL TESTO ARTICOLO */}
      {artView && (
        <div className="overlay" onClick={() => setArtView(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div
              className="modal-hdr"
              style={{
                background: artView.side === '2016' ? '#7b1a1a' : '#0d2a4a',
                paddingRight: 56,
              }}
            >
              <div
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: 9,
                  textTransform: 'uppercase',
                  letterSpacing: '.12em',
                  color: artView.side === '2016' ? '#ffb3b3' : '#7fbfff',
                  marginBottom: 6,
                }}
              >
                {artView.side === '2016'
                  ? '📕 D.Lgs. 50/2016 — Vecchio Codice'
                  : '📘 D.Lgs. 36/2023 — Nuovo Codice'}
              </div>
              <div
                style={{
                  color: 'white',
                  fontSize: 20,
                  fontWeight: 300,
                  lineHeight: 1.3,
                }}
              >
                Art. {artView.num} — {artView.title}
              </div>
              <button
                className="close-btn"
                style={{
                  background: artView.side === '2016' ? '#c0392b' : '#1a5276',
                }}
                onClick={() => setArtView(null)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">{artView.text}</div>
            <div
              style={{
                padding: '12px 24px',
                borderTop: '1px solid #e0d8d0',
                background: '#fafaf8',
                display: 'flex',
                gap: 10,
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: 10,
                  color: '#888',
                }}
              >
                Testo estratto dal PDF ufficiale · Potrebbero essere presenti
                difformità tipografiche da formattazione PDF
              </div>
              <button
                onClick={() => setArtView(null)}
                style={{
                  marginLeft: 'auto',
                  background: '#1a3a5c',
                  color: 'white',
                  border: 'none',
                  padding: '6px 14px',
                  borderRadius: 3,
                  fontFamily: "'DM Mono',monospace",
                  fontSize: 11,
                  cursor: 'pointer',
                }}
              >
                CHIUDI ×
              </button>
            </div>
          </div>
        </div>
      )}
      {/* MODAL INFO */}
      {showInfo && (
        <div className="overlay" onClick={() => setShowInfo(false)}>
          <div
            className="modal"
            style={{ maxWidth: 680 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              style={{
                background: 'linear-gradient(135deg,#0d2137,#1a3a5c)',
                padding: '24px 28px 20px',
                position: 'relative',
              }}
            >
              <div
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: 9,
                  letterSpacing: '.15em',
                  color: '#c0a060',
                  textTransform: 'uppercase',
                  marginBottom: 8,
                }}
              >
                ARPA Sicilia · Strumento interno
              </div>
              <h2
                style={{
                  color: '#f0e6d0',
                  fontWeight: 300,
                  fontSize: 22,
                  marginBottom: 4,
                }}
              >
                Informazioni &amp; Contatti
              </h2>
              <div
                style={{
                  color: '#9ab0c8',
                  fontSize: 12,
                  fontFamily: "'DM Mono',monospace",
                }}
              >
                Codice Appalti — Tavola di conversione 50/2016 ↔ 36/2023
              </div>
              <button className="close-btn" onClick={() => setShowInfo(false)}>
                ×
              </button>
            </div>

            <div style={{ padding: '0', overflowY: 'auto', maxHeight: '75vh' }}>
              {/* CONTATTO */}
              <div
                style={{
                  padding: '20px 28px',
                  borderBottom: '1px solid #e8e0d8',
                  background: '#fafaf8',
                }}
              >
                <div
                  style={{
                    fontFamily: "'DM Mono',monospace",
                    fontSize: 9,
                    textTransform: 'uppercase',
                    letterSpacing: '.12em',
                    color: '#7a6a5a',
                    marginBottom: 12,
                  }}
                >
                  📬 Contatto Responsabile
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    flexWrap: 'wrap',
                  }}
                >
                  <div
                    style={{
                      background: '#0d2137',
                      borderRadius: 50,
                      width: 48,
                      height: 48,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 22,
                      flexShrink: 0,
                    }}
                  >
                    👤
                  </div>
                  <div>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: 16,
                        color: '#1a1a1a',
                        marginBottom: 2,
                      }}
                    >
                      Dott. Scannavino
                    </div>
                    <div
                      style={{
                        fontFamily: "'DM Mono',monospace",
                        fontSize: 12,
                        color: '#1a5276',
                      }}
                    >
                      ARPA Sicilia
                    </div>
                  </div>
                  <a
                    href="mailto:ascannavino@arpa.sicilia.it"
                    style={{
                      marginLeft: 'auto',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      background: '#1a3a5c',
                      color: 'white',
                      padding: '9px 16px',
                      borderRadius: 4,
                      textDecoration: 'none',
                      fontFamily: "'DM Mono',monospace",
                      fontSize: 11,
                      letterSpacing: '.06em',
                      flexShrink: 0,
                    }}
                  >
                    ✉️ ascannavino@arpa.sicilia.it
                  </a>
                </div>
              </div>

              {/* NOVITÀ NORMATIVE */}
              <div
                style={{
                  padding: '20px 28px',
                  borderBottom: '1px solid #e8e0d8',
                }}
              >
                <div
                  style={{
                    fontFamily: "'DM Mono',monospace",
                    fontSize: 9,
                    textTransform: 'uppercase',
                    letterSpacing: '.12em',
                    color: '#7a6a5a',
                    marginBottom: 14,
                  }}
                >
                  🆕 Aggiornamenti Normativi Recenti
                </div>
                {[
                  {
                    data: 'Gen 2025',
                    titolo: 'Correttivo al Codice 2023 — D.Lgs. 209/2024',
                    testo:
                      'Approvato il primo correttivo al D.Lgs. 36/2023, in vigore dal 31 dicembre 2024. Modifica circa 60 articoli su temi quali qualificazione SA, progettazione, subappalto, concessioni e PNRR.',
                    colore: '#c0392b',
                    badge: 'VIGENTE',
                  },
                  {
                    data: 'Lug 2023',
                    titolo: 'Piena applicazione D.Lgs. 36/2023',
                    testo:
                      'Dal 1° luglio 2023 il nuovo Codice si applica a tutte le procedure. Il D.Lgs. 50/2016 è definitivamente abrogato, salvo le procedure avviate prima di tale data (art. 226).',
                    colore: '#1a5276',
                    badge: 'IN VIGORE',
                  },
                  {
                    data: 'Apr 2023',
                    titolo: 'Entrata in vigore D.Lgs. 36/2023',
                    testo:
                      'Il nuovo Codice dei Contratti Pubblici è entrato in vigore il 1° aprile 2023 con regime transitorio fino al 30 giugno 2023.',
                    colore: '#1e8449',
                    badge: 'STORICO',
                  },
                  {
                    data: '2024',
                    titolo: 'Soglie europee aggiornate — Reg. UE 2023/2495',
                    testo:
                      'La Commissione UE ha aggiornato le soglie di rilevanza: lavori 5.538.000 €, servizi/forniture enti centrali 143.000 €, altri enti 221.000 €, settori speciali 443.000 €. Applicabili dal 1° gennaio 2024.',
                    colore: '#6c3483',
                    badge: 'SOGLIE',
                  },
                  {
                    data: '2024',
                    titolo: 'MIT — Linee guida RUP (All. I.2)',
                    testo:
                      'Il Ministero delle Infrastrutture ha emanato le linee guida operative per il Responsabile Unico del Progetto, con requisiti di qualificazione professionale aggiornati.',
                    colore: '#784212',
                    badge: 'MIT',
                  },
                  {
                    data: '2023',
                    titolo: 'ANAC — Banca Dati Nazionale Contratti Pubblici',
                    testo:
                      'Operativa la nuova BDNCP. Tutte le stazioni appaltanti sono obbligate a pubblicare gli atti di gara sulla piattaforma digitale nazionale (art. 23 D.Lgs. 36/2023).',
                    colore: '#37474f',
                    badge: 'ANAC',
                  },
                ].map((n, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      gap: 12,
                      marginBottom: 14,
                      paddingBottom: 14,
                      borderBottom: i < 5 ? '1px dashed #e0d8d0' : 'none',
                    }}
                  >
                    <div
                      style={{
                        flexShrink: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      <div
                        style={{
                          background: n.colore,
                          color: 'white',
                          borderRadius: 3,
                          padding: '2px 7px',
                          fontFamily: "'DM Mono',monospace",
                          fontSize: 9,
                          letterSpacing: '.05em',
                          textTransform: 'uppercase',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {n.badge}
                      </div>
                      <div
                        style={{
                          fontFamily: "'DM Mono',monospace",
                          fontSize: 9,
                          color: '#999',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {n.data}
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: 13,
                          color: '#1a1a1a',
                          marginBottom: 3,
                        }}
                      >
                        {n.titolo}
                      </div>
                      <div
                        style={{ fontSize: 12, color: '#555', lineHeight: 1.6 }}
                      >
                        {n.testo}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* SCADENZE */}
              <div
                style={{
                  padding: '20px 28px',
                  borderBottom: '1px solid #e8e0d8',
                  background: '#fffbf0',
                }}
              >
                <div
                  style={{
                    fontFamily: "'DM Mono',monospace",
                    fontSize: 9,
                    textTransform: 'uppercase',
                    letterSpacing: '.12em',
                    color: '#7a6a5a',
                    marginBottom: 14,
                  }}
                >
                  📅 Date e Scadenze Importanti
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))',
                    gap: 10,
                  }}
                >
                  {[
                    {
                      label: 'Piena vigenza codice 2023',
                      data: '1 lug 2023',
                      colore: '#1e8449',
                    },
                    {
                      label: 'Abrogazione D.Lgs. 50/2016',
                      data: '1 lug 2023',
                      colore: '#c0392b',
                    },
                    {
                      label: 'Correttivo D.Lgs. 209/2024',
                      data: '31 dic 2024',
                      colore: '#e67e22',
                    },
                    {
                      label: 'Nuove soglie UE 2024',
                      data: '1 gen 2024',
                      colore: '#6c3483',
                    },
                    {
                      label: 'BDNCP obbligatoria per tutti',
                      data: '1 gen 2024',
                      colore: '#37474f',
                    },
                    {
                      label: 'Qualificazione SA obbligatoria',
                      data: 'Da definire MIT',
                      colore: '#784212',
                    },
                  ].map((s, i) => (
                    <div
                      key={i}
                      style={{
                        background: 'white',
                        border: `1.5px solid ${s.colore}30`,
                        borderLeft: `3px solid ${s.colore}`,
                        borderRadius: 4,
                        padding: '10px 12px',
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "'DM Mono',monospace",
                          fontSize: 10,
                          fontWeight: 600,
                          color: s.colore,
                          marginBottom: 3,
                        }}
                      >
                        {s.data}
                      </div>
                      <div
                        style={{ fontSize: 12, color: '#333', lineHeight: 1.4 }}
                      >
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* LINK UFFICIALI */}
              <div style={{ padding: '20px 28px' }}>
                <div
                  style={{
                    fontFamily: "'DM Mono',monospace",
                    fontSize: 9,
                    textTransform: 'uppercase',
                    letterSpacing: '.12em',
                    color: '#7a6a5a',
                    marginBottom: 14,
                  }}
                >
                  🔗 Risorse Ufficiali
                </div>
                <div
                  style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
                >
                  {[
                    {
                      nome: 'Normattiva — D.Lgs. 36/2023',
                      url: 'https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:2023-03-31;36',
                      desc: 'Testo vigente coordinato con le modifiche',
                    },
                    {
                      nome: 'Normattiva — D.Lgs. 50/2016',
                      url: 'https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:2016-04-18;50',
                      desc: 'Testo storico abrogato (per contratti pregressi)',
                    },
                    {
                      nome: 'ANAC — Contratti Pubblici',
                      url: 'https://www.anticorruzione.it/portal/public/classic/Servizi/ServiziOnline/ContrattiPubblici',
                      desc: 'Banca dati, comunicati e atti di regolazione ANAC',
                    },
                    {
                      nome: 'MIT — Codice Appalti',
                      url: 'https://www.mit.gov.it/comunicazione/news/codice-dei-contratti-pubblici',
                      desc: 'Ministero Infrastrutture: circolari, allegati e linee guida',
                    },
                    {
                      nome: 'EUR-Lex — Direttiva 2014/24/UE',
                      url: 'https://eur-lex.europa.eu/legal-content/IT/TXT/?uri=CELEX:32014L0024',
                      desc: 'Direttiva appalti settori ordinari recepita dal codice',
                    },
                    {
                      nome: 'ARPA Sicilia',
                      url: 'https://www.arpa.sicilia.it',
                      desc: "Agenzia Regionale per la Protezione dell'Ambiente della Sicilia",
                    },
                  ].map((l, i) => (
                    <a
                      key={i}
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        padding: '10px 14px',
                        background: '#f4f1eb',
                        border: '1px solid #d5ccc0',
                        borderRadius: 4,
                        textDecoration: 'none',
                        transition: 'background .15s',
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = '#e8e2d9')
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = '#f4f1eb')
                      }
                    >
                      <span style={{ fontSize: 16, flexShrink: 0 }}>🌐</span>
                      <div>
                        <div
                          style={{
                            fontWeight: 600,
                            fontSize: 13,
                            color: '#1a3a5c',
                          }}
                        >
                          {l.nome}
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            color: '#888',
                            fontFamily: "'DM Mono',monospace",
                          }}
                        >
                          {l.desc}
                        </div>
                      </div>
                      <span
                        style={{
                          marginLeft: 'auto',
                          color: '#b8a99a',
                          fontSize: 14,
                        }}
                      >
                        ↗
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer modal */}
            <div
              style={{
                padding: '12px 28px',
                borderTop: '1px solid #e0d8d0',
                background: '#f4f1eb',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 10,
                flexWrap: 'wrap',
              }}
            >
              <div
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: 10,
                  color: '#999',
                  lineHeight: 1.5,
                }}
              >
                App sviluppata per uso interno ARPA Sicilia · Dati aggiornati a
                dic. 2024
              </div>
              <button
                onClick={() => setShowInfo(false)}
                style={{
                  background: '#1a3a5c',
                  color: 'white',
                  border: 'none',
                  padding: '7px 16px',
                  borderRadius: 3,
                  fontFamily: "'DM Mono',monospace",
                  fontSize: 11,
                  cursor: 'pointer',
                  letterSpacing: '.05em',
                }}
              >
                CHIUDI ×
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
