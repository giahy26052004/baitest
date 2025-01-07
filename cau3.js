// Import thư viện 'fs' (File System) để làm việc với file
const fs = require("fs");

// Đọc dữ liệu từ file JSON 'data.json'
fs.readFile("data.json", "utf8", (err, data) => {
  if (err) {
    console.error("Lỗi khi đọc file:", err);
    return; // Dừng lại nếu có lỗi khi đọc file
  }

  try {
    // Phân tích chuỗi JSON thành đối tượng JavaScript
    const jsonData = JSON.parse(data);

    // Hàm rút gọn các tên trường trong đối tượng
    function shortenKeys(obj) {
      // Định nghĩa bảng ánh xạ các tên khóa dài thành ngắn
      const keyMap = {
        id: "i",
        season_id: "si",
        stage_id: "st",
        group_num: "gn",
        round_num: "rn",
        start_time: "stt",
        start_timestamp: "ts",
        sport_event_status: "ses",
        status_id: "sid",
        updated_at: "ua",
        record_updated_at: "r_ua",
        home_team_id: "htid",
        away_team_id: "atid",
        competition_id: "cid",
        lineup: "lu",
        venue_id: "vid",
        referee_id: "rfid",
        related_id: "rid",
        agg_score: "asg",
      };

      let newObj = {}; // Khởi tạo đối tượng mới để lưu dữ liệu đã rút gọn
      // Duyệt qua từng khóa trong đối tượng gốc
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          // Ánh xạ khóa cũ thành khóa mới nếu có trong keyMap, ngược lại giữ nguyên
          const newKey = keyMap[key] || key;

          // Nếu giá trị là chuỗi, loại bỏ khoảng trắng thừa
          if (typeof obj[key] === "string") {
            newObj[newKey] = obj[key].trim(); // Xóa khoảng trắng thừa trong chuỗi
          } else {
            // Nếu không phải chuỗi, giữ nguyên giá trị
            newObj[newKey] = obj[key];
          }
        }
      }
      return newObj; // Trả về đối tượng đã rút gọn khóa
    }

    // Hàm phân tích chuỗi JSON trong trường 'sport_event_status'
    function parseSportEventStatus(data) {
      // Kiểm tra nếu dữ liệu là chuỗi
      if (data && typeof data === "string") {
        try {
          // Parse chuỗi JSON thành đối tượng
          return JSON.parse(data);
        } catch (error) {
          // In lỗi nếu không thể phân tích chuỗi
          console.error("Lỗi khi phân tích sport_event_status:", error);
          return data; // Trả về dữ liệu gốc nếu gặp lỗi
        }
      }
      return data; // Nếu không phải chuỗi, trả về dữ liệu gốc
    }

    // Xử lý dữ liệu JSON
    const cleanedData = jsonData[
      "select * from sport_events se where se.start_timestamp >= 1729875600 and se.start_timestamp <= 1729962000"
    ].map((item) => {
      // Xử lý trường 'sport_event_status' (parse chuỗi JSON)
      item.sport_event_status = parseSportEventStatus(item.sport_event_status);

      // Rút gọn tên trường trong từng item (sự kiện thể thao)
      return shortenKeys(item);
    });

    // Ghi kết quả đã xử lý vào file mới 'cleaned_data.json'
    fs.writeFile(
      "cleaned_data.json",
      JSON.stringify(cleanedData, null, 2), // Tham số null, 2 để tạo định dạng JSON dễ đọc
      (err) => {
        if (err) {
          console.error("Lỗi khi ghi file:", err); // Xử lý lỗi ghi file
        } else {
          console.log('Dữ liệu đã được xử lý và lưu vào "cleaned_data.json".');
        }
      }
    );
  } catch (error) {
    // Xử lý lỗi khi phân tích dữ liệu JSON từ file
    console.error("Lỗi khi phân tích JSON từ file:", error);
  }
});
