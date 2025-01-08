function doGet(e) {
  // เมื่อมีการเปิด Web App (URL ของ Apps Script)
  // จะแสดงหน้า index.html ผ่าน HTML Service
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle('บันทึกการลงพื้นที่');
    // หากต้องการฝังใน iFrame ที่อื่น อาจต้องใช้ .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
}

/**
 * ฟังก์ชันที่หน้า HTML เรียกผ่าน google.script.run
 * เพื่อบันทึกข้อมูลลง Google Sheets
 */
function submitFormData(data) {
  try {
    // 1) เปิดสเปรดชีตตาม Spreadsheet ID
    //    (ดูจาก URL ของ Google Sheets)
    var sheet = SpreadsheetApp.openById("##########################################") 
                              .getSheetByName("#######################"); // ปรับชื่อชีตตามต้องการ
    
    // 2) เพิ่มข้อมูลเป็นแถวใหม่
    //    เก็บ Timestamp (new Date), date, location, details
    sheet.appendRow([
      new Date(),        // Timestamp
      data.date,         // วันที่
      data.location,     // สถานที่
      data.details       // รายละเอียด
    ]);

    // 3) ส่งสถานะ "success" กลับไป
    return {
      status: 'success',
      message: 'บันทึกข้อมูลสำเร็จ!'
    };

  } catch (error) {
    // หากมีปัญหา ส่งสถานะ "error" กลับ
    return {
      status: 'error',
      message: error.message
    };
  }
}

/**
 * ฟังก์ชันช่วย (Include) สำหรับกรณีมีหลายไฟล์ HTML แยก
 * กรณีนี้ถ้าไฟล์ index.html ไฟล์เดียว อาจไม่จำเป็นใช้ก็ได้
 */
function include(filename) {
  return HtmlService.createTemplateFromFile(filename).getRawContent();
}

