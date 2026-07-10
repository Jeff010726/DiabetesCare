type AgreementSection = {
  title: string;
  body?: string[];
  bullets?: string[];
};

export const classAgreementResources: Record<string, {
  back: string;
  title: string;
  lead: string;
  sections: AgreementSection[];
}> = {
  en: {
    back: "Back to class signup",
    title: "DSMES Participant Confidentiality and Intellectual Property Agreement",
    lead: "This Participant Confidentiality and Intellectual Property Agreement is entered into by and between XT Diabetes Care and the participant attending the Diabetes Self-Management Education and Support program.",
    sections: [
      { title: "1. Purpose", body: ["The DSMES program is designed to provide participants with diabetes self-management knowledge, skills, and support. During the course, participants may be exposed to personal information, health information, and experiences shared by other participants.", "To protect the privacy of all participants and safeguard the intellectual property rights associated with the program and educational materials, Participants agree to comply with the terms and conditions of this Agreement."] },
      { title: "2. Confidential Information", body: ["Confidential Information includes any non-public information learned, seen, heard, or received during the course, including participant identities, health information, contact information, insurance or financial information, personal experiences, HIPAA-protected information, and any information that could identify a participant."] },
      { title: "3. Participant Confidentiality Obligations", bullets: ["Respect and protect the privacy and confidentiality of all participants.", "Do not disclose, discuss, share, distribute, or otherwise communicate Confidential Information outside the course.", "Do not attempt to identify, track, or obtain personal information about other participants.", "Do not use information learned about other participants for any unauthorized purpose.", "Follow all instructor and staff instructions regarding privacy, confidentiality, and course participation.", "Promptly notify XT Diabetes Care of any actual or suspected privacy breach or violation."] },
      { title: "4. Participant Privacy Protection", body: ["Participants may not photograph, record, distribute, or otherwise share names, facial images, contact information, health information, verbal comments, personal experiences, stories, or case discussions relating to other participants.", "Photographs, videos, or audio recordings that include other participants or staff require prior express consent from all individuals involved."] },
      { title: "5. Course Materials Usage", body: ["Participants may photograph course handouts, slides, or other course materials solely for personal educational and review purposes. This permission does not extend to other participants, staff members, or content containing personal information."], bullets: ["Do not copy, reproduce, redistribute, record, screenshot, or publicly share course materials without written authorization.", "Do not provide course materials to anyone not enrolled in the course.", "Do not post course content on social media, websites, forums, cloud-sharing platforms, or other public channels.", "Do not upload course content to artificial intelligence platforms, online databases, or third-party systems.", "Do not use course content for teaching, training, research, consulting, marketing, or other professional or commercial purposes.", "Do not sell, transfer, lease, license, or otherwise commercially exploit course content."] },
      { title: "6. Intellectual Property Protection", body: ["All content provided as part of the DSMES program is owned by XT Diabetes Care and/or its licensors and is protected by applicable copyright, intellectual property, and other laws.", "Protected content includes course design, educational content, handouts, slides, worksheets, case studies, audio, video, charts, graphics, images, written materials, translations, and any printed or electronic materials distributed during the course.", "XT Diabetes Care reserves all rights, title, and interest in and to the course content and related educational resources."] },
      { title: "7. Limited License", body: ["Participants receive a limited, non-exclusive, non-transferable, and revocable license to access and use course materials solely for personal educational purposes. Participants acquire no ownership rights or intellectual property rights in any course content."] },
      { title: "8. HIPAA and Privacy Compliance", body: ["Participants understand that health-related information protected under HIPAA and other applicable privacy laws may be discussed during the course. Participants agree not to use or disclose Protected Health Information or other Confidential Information without proper authorization."] },
      { title: "9. Breach and Remedies", bullets: ["Immediate removal from the course.", "Denial of future participation in XT Diabetes Care programs.", "Revocation of course-related privileges or benefits.", "Additional actions permitted by applicable laws or organizational policies.", "Civil, administrative, or other legal liability where applicable."] },
      { title: "10. Term", body: ["This Agreement becomes effective upon signature or electronic acceptance. The Participant's obligations regarding confidentiality, privacy protection, and intellectual property restrictions survive completion, withdrawal, or termination of participation and remain in effect indefinitely unless otherwise required by law."] },
      { title: "11. Acknowledgment", body: ["By signing or electronically accepting this Agreement, the Participant acknowledges that they have read and understood the Agreement, had an opportunity to ask questions, voluntarily agree to comply with all terms, and understand the potential consequences and legal liabilities associated with violating the Agreement."] },
    ],
  },
  "zh-CN": {
    back: "返回课程报名",
    title: "DSMES 参与者保密与知识产权协议",
    lead: "本《参与者保密与知识产权协议》由 XT Diabetes Care 与参加糖尿病自我管理教育与支持（DSMES）项目的参与者共同订立。",
    sections: [
      { title: "1. 目的", body: ["DSMES 项目旨在为参与者提供糖尿病自我管理所需的知识、技能和支持。课程期间，参与者可能接触到其他参与者分享的个人信息、健康信息和经历。", "为保护所有参与者的隐私，并保障与本项目及教学材料相关的知识产权，参与者同意遵守本协议的条款与条件。"] },
      { title: "2. 保密信息", body: ["保密信息包括在课程中获悉、看到、听到或收到的任何非公开信息，包括参与者身份、健康信息、联系信息、保险或财务信息、个人经历、受 HIPAA 保护的信息，以及任何可识别参与者身份的信息。"] },
      { title: "3. 参与者保密义务", bullets: ["尊重并保护所有参与者的隐私和保密性。", "不得在课程之外披露、讨论、分享、传播或以其他方式传达保密信息。", "不得试图识别、追踪或获取其他参与者的个人信息。", "不得将有关其他参与者的信息用于任何未经授权的目的。", "遵守讲师和工作人员关于隐私、保密及课程参与的所有指示。", "如发生或怀疑发生隐私泄露或违规，应及时通知 XT Diabetes Care。"] },
      { title: "4. 参与者隐私保护", body: ["参与者不得拍摄、录制、传播或以其他方式分享与其他参与者有关的姓名、面部影像、联系信息、健康信息、口头发言、个人经历、故事或案例讨论。", "包含其他参与者或工作人员的照片、视频或录音，须事先获得所有相关人员的明确同意。"] },
      { title: "5. 课程材料的使用", body: ["参与者可仅为个人学习和复习目的拍摄课程讲义、幻灯片或其他课程材料。该许可不适用于其他参与者、工作人员，或包含个人信息的内容。"], bullets: ["未经书面授权，不得复制、再制作、再传播、录制、截屏或公开分享课程材料。", "不得向未报名课程的任何人提供课程材料。", "不得在社交媒体、网站、论坛、云端共享平台或其他公开渠道发布课程内容。", "不得将课程内容上传至人工智能平台、在线数据库或第三方系统。", "不得将课程内容用于教学、培训、研究、咨询、营销或其他专业、商业目的。", "不得出售、转让、出租、许可或以其他方式将课程内容用于商业获利。"] },
      { title: "6. 知识产权保护", body: ["DSMES 项目提供的所有内容均归 XT Diabetes Care 及/或其许可方所有，并受适用的著作权、知识产权及其他法律保护。", "受保护的内容包括课程设计、教学内容、讲义、幻灯片、工作表、案例研究、音频、视频、图表、图形、图片、书面材料、翻译，以及课程期间发放的任何纸质或电子材料。", "XT Diabetes Care 保留课程内容及相关教育资源的全部权利、所有权和权益。"] },
      { title: "7. 有限许可", body: ["参与者获得有限、非排他、不可转让且可撤销的许可，仅可为个人学习目的访问和使用课程材料。参与者不因此取得任何课程内容的所有权或知识产权。"] },
      { title: "8. HIPAA 与隐私合规", body: ["参与者理解，课程中可能讨论受 HIPAA 和其他适用隐私法律保护的健康相关信息。未经适当授权，参与者同意不使用或披露受保护健康信息或其他保密信息。"] },
      { title: "9. 违约与补救措施", bullets: ["立即从课程中移除。", "不得再参加 XT Diabetes Care 的未来项目。", "撤销与课程相关的特权或权益。", "采取适用法律或机构政策允许的其他行动。", "在适用情况下承担民事、行政或其他法律责任。"] },
      { title: "10. 协议期限", body: ["本协议自签署或电子同意时生效。除非法律另有要求，参与者有关保密、隐私保护和知识产权限制的义务，在完成、退出或终止参与后仍持续有效，且无限期延续。"] },
      { title: "11. 确认", body: ["通过签署或以电子方式接受本协议，参与者确认已阅读并理解本协议，有机会提出问题，自愿同意遵守所有条款，并理解违反本协议可能带来的后果和法律责任。"] },
    ],
  },
  "zh-TW": {
    back: "返回課程報名",
    title: "DSMES 參與者保密與智慧財產權協議",
    lead: "本《參與者保密與智慧財產權協議》由 XT Diabetes Care 與參加糖尿病自我管理教育與支持（DSMES）計畫的參與者共同訂立。",
    sections: [
      { title: "1. 目的", body: ["DSMES 計畫旨在為參與者提供糖尿病自我管理所需的知識、技能和支持。課程期間，參與者可能接觸到其他參與者分享的個人資訊、健康資訊和經歷。", "為保護所有參與者的隱私，並保障與本計畫及教學材料相關的智慧財產權，參與者同意遵守本協議的條款與條件。"] },
      { title: "2. 保密資訊", body: ["保密資訊包括在課程中獲悉、看到、聽到或收到的任何非公開資訊，包括參與者身分、健康資訊、聯絡資訊、保險或財務資訊、個人經歷、受 HIPAA 保護的資訊，以及任何可識別參與者身分的資訊。"] },
      { title: "3. 參與者保密義務", bullets: ["尊重並保護所有參與者的隱私和保密性。", "不得在課程之外揭露、討論、分享、散布或以其他方式傳達保密資訊。", "不得試圖識別、追蹤或取得其他參與者的個人資訊。", "不得將有關其他參與者的資訊用於任何未經授權的目的。", "遵守講師和工作人員關於隱私、保密及課程參與的所有指示。", "如發生或懷疑發生隱私外洩或違規，應立即通知 XT Diabetes Care。"] },
      { title: "4. 參與者隱私保護", body: ["參與者不得拍攝、錄製、散布或以其他方式分享與其他參與者有關的姓名、臉部影像、聯絡資訊、健康資訊、口頭發言、個人經歷、故事或個案討論。", "包含其他參與者或工作人員的照片、影片或錄音，須事先取得所有相關人員的明確同意。"] },
      { title: "5. 課程材料的使用", body: ["參與者可僅為個人學習和複習目的拍攝課程講義、投影片或其他課程材料。該許可不適用於其他參與者、工作人員，或包含個人資訊的內容。"], bullets: ["未經書面授權，不得複製、再製、再散布、錄製、截圖或公開分享課程材料。", "不得向未報名課程的任何人提供課程材料。", "不得在社群媒體、網站、論壇、雲端分享平台或其他公開管道發布課程內容。", "不得將課程內容上傳至人工智慧平台、線上資料庫或第三方系統。", "不得將課程內容用於教學、培訓、研究、諮詢、行銷或其他專業、商業目的。", "不得出售、轉讓、出租、授權或以其他方式將課程內容用於商業獲利。"] },
      { title: "6. 智慧財產權保護", body: ["DSMES 計畫提供的所有內容均歸 XT Diabetes Care 及/或其授權人所有，並受適用的著作權、智慧財產權及其他法律保護。", "受保護的內容包括課程設計、教學內容、講義、投影片、工作表、個案研究、音訊、影片、圖表、圖形、圖片、書面材料、翻譯，以及課程期間發放的任何紙本或電子材料。", "XT Diabetes Care 保留課程內容及相關教育資源的全部權利、所有權和權益。"] },
      { title: "7. 有限授權", body: ["參與者獲得有限、非專屬、不可轉讓且可撤銷的授權，僅可為個人學習目的存取和使用課程材料。參與者不因此取得任何課程內容的所有權或智慧財產權。"] },
      { title: "8. HIPAA 與隱私合規", body: ["參與者理解，課程中可能討論受 HIPAA 和其他適用隱私法律保護的健康相關資訊。未經適當授權，參與者同意不使用或揭露受保護健康資訊或其他保密資訊。"] },
      { title: "9. 違約與補救措施", bullets: ["立即從課程中移除。", "不得再參加 XT Diabetes Care 的未來計畫。", "撤銷與課程相關的特權或權益。", "採取適用法律或機構政策允許的其他行動。", "在適用情況下承擔民事、行政或其他法律責任。"] },
      { title: "10. 協議期限", body: ["本協議自簽署或電子同意時生效。除非法律另有要求，參與者有關保密、隱私保護和智慧財產權限制的義務，在完成、退出或終止參與後仍持續有效，且無限期延續。"] },
      { title: "11. 確認", body: ["透過簽署或以電子方式接受本協議，參與者確認已閱讀並理解本協議，有機會提出問題，自願同意遵守所有條款，並理解違反本協議可能帶來的後果和法律責任。"] },
    ],
  },
  es: {
    back: "Volver a la inscripción",
    title: "Acuerdo de confidencialidad y propiedad intelectual para participantes de DSMES",
    lead: "Este Acuerdo de confidencialidad y propiedad intelectual para participantes se celebra entre XT Diabetes Care y la persona participante del programa de Educación y Apoyo para el Automanejo de la Diabetes.",
    sections: [
      { title: "1. Propósito", body: ["El programa DSMES está diseñado para proporcionar a las personas participantes conocimientos, habilidades y apoyo para el automanejo de la diabetes. Durante el curso, las personas participantes pueden estar expuestas a información personal, información de salud y experiencias compartidas por otras personas participantes.", "Para proteger la privacidad de todas las personas participantes y salvaguardar los derechos de propiedad intelectual asociados con el programa y los materiales educativos, las personas participantes aceptan cumplir los términos y condiciones de este Acuerdo."] },
      { title: "2. Información confidencial", body: ["La Información confidencial incluye toda información no pública que se aprenda, vea, escuche o reciba durante el curso, incluidas las identidades de participantes, información de salud, información de contacto, información de seguros o financiera, experiencias personales, información protegida por HIPAA y cualquier información que pueda identificar a una persona participante."] },
      { title: "3. Obligaciones de confidencialidad de la persona participante", bullets: ["Respetar y proteger la privacidad y confidencialidad de todas las personas participantes.", "No divulgar, comentar, compartir, distribuir ni comunicar de otro modo Información confidencial fuera del curso.", "No intentar identificar, rastrear ni obtener información personal de otras personas participantes.", "No utilizar información aprendida sobre otras personas participantes para ningún propósito no autorizado.", "Seguir todas las instrucciones de instructores y personal respecto de privacidad, confidencialidad y participación en el curso.", "Notificar oportunamente a XT Diabetes Care cualquier vulneración o presunta vulneración de la privacidad."] },
      { title: "4. Protección de la privacidad de participantes", body: ["Las personas participantes no pueden fotografiar, grabar, distribuir ni compartir de otro modo nombres, imágenes faciales, información de contacto, información de salud, comentarios verbales, experiencias personales, historias o discusiones de casos relacionadas con otras personas participantes.", "Las fotografías, videos o grabaciones de audio que incluyan a otras personas participantes o al personal requieren el consentimiento previo y expreso de todas las personas involucradas."] },
      { title: "5. Uso de materiales del curso", body: ["Las personas participantes pueden fotografiar folletos, diapositivas u otros materiales del curso únicamente para fines personales de educación y revisión. Este permiso no se extiende a otras personas participantes, miembros del personal ni contenido que incluya información personal."], bullets: ["No copiar, reproducir, redistribuir, grabar, capturar pantalla ni compartir públicamente materiales del curso sin autorización por escrito.", "No proporcionar materiales del curso a nadie que no esté inscrito en el curso.", "No publicar contenido del curso en redes sociales, sitios web, foros, plataformas de intercambio en la nube u otros canales públicos.", "No cargar contenido del curso en plataformas de inteligencia artificial, bases de datos en línea o sistemas de terceros.", "No usar contenido del curso para enseñanza, capacitación, investigación, consultoría, mercadeo ni otros fines profesionales o comerciales.", "No vender, transferir, arrendar, otorgar licencias ni explotar comercialmente el contenido del curso de ningún modo."] },
      { title: "6. Protección de la propiedad intelectual", body: ["Todo el contenido proporcionado como parte del programa DSMES es propiedad de XT Diabetes Care y/o de sus licenciantes, y está protegido por las leyes aplicables de derechos de autor, propiedad intelectual y otras leyes.", "El contenido protegido incluye el diseño del curso, contenido educativo, folletos, diapositivas, hojas de trabajo, estudios de caso, audio, video, tablas, gráficos, imágenes, materiales escritos, traducciones y cualquier material impreso o electrónico distribuido durante el curso.", "XT Diabetes Care se reserva todos los derechos, títulos e intereses sobre el contenido del curso y los recursos educativos relacionados."] },
      { title: "7. Licencia limitada", body: ["Las personas participantes reciben una licencia limitada, no exclusiva, intransferible y revocable para acceder y utilizar los materiales del curso únicamente con fines educativos personales. No adquieren derechos de propiedad ni derechos de propiedad intelectual sobre ningún contenido del curso."] },
      { title: "8. Cumplimiento de HIPAA y privacidad", body: ["Las personas participantes comprenden que durante el curso puede hablarse de información relacionada con la salud protegida por HIPAA y otras leyes de privacidad aplicables. Aceptan no usar ni divulgar Información de Salud Protegida u otra Información confidencial sin la debida autorización."] },
      { title: "9. Incumplimiento y medidas", bullets: ["Expulsión inmediata del curso.", "Negación de participación futura en programas de XT Diabetes Care.", "Revocación de privilegios o beneficios relacionados con el curso.", "Medidas adicionales permitidas por las leyes aplicables o políticas de la organización.", "Responsabilidad civil, administrativa u otra responsabilidad legal cuando corresponda."] },
      { title: "10. Vigencia", body: ["Este Acuerdo entra en vigor al firmarse o aceptarse electrónicamente. Las obligaciones de la persona participante respecto de confidencialidad, protección de la privacidad y restricciones de propiedad intelectual sobreviven a la finalización, retiro o terminación de la participación y permanecen vigentes indefinidamente, salvo que la ley exija lo contrario."] },
      { title: "11. Reconocimiento", body: ["Al firmar o aceptar electrónicamente este Acuerdo, la persona participante reconoce que lo ha leído y entendido, que ha tenido la oportunidad de hacer preguntas, que acepta voluntariamente cumplir todos los términos y que comprende las posibles consecuencias y responsabilidades legales asociadas con su incumplimiento."] },
    ],
  },
};
