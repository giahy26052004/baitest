//Dùng hai con trỏ, một bắt đầu từ đầu chuỗi và một bắt đầu từ cuối chuỗi, so sánh ký tự tại các vị trí này. Nếu phát hiện sự khác biệt, trả về false. Nếu không, di chuyển các con trỏ vào trong và tiếp tục so sánh cho đến khi gặp nhau.
function isPalindrome(s) {
  // Loại bỏ ký tự không phải chữ cái và chữ số, và chuyển thành chữ thường
  s = s.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

  let left = 0; // Con trỏ trái
  let right = s.length - 1; // Con trỏ phải

  // Duyệt và so sánh hai đầu cho đến khi chúng gặp nhau
  while (left < right) {
    if (s[left] !== s[right]) {
      // Nếu có ký tự không khớp
      return false; // Không phải chuỗi đối xứng
    }
    left++; // Di chuyển con trỏ trái vào trong
    right--; // Di chuyển con trỏ phải vào trong
  }

  return true; // Nếu không có ký tự nào khác biệt, chuỗi đối xứng
}

// Test case với chuỗi dài
console.log(isPalindrome("A man, a plan, a canal, Panama")); // true
console.log(isPalindrome("No 'x' in Nixon")); // true
console.log(isPalindrome("level")); // true
console.log(isPalindrome("hello")); // false

// Test với chuỗi dài (tối đa 10^5 ký tự)
let longPalindrome = "a".repeat(50000) + "b" + "a".repeat(50000); // Chuỗi đối xứng với độ dài lớn
console.log(isPalindrome(longPalindrome)); // true
