// Độ phức tạp 𝑂(𝑛);

function twoSum(nums, target) {
  const result = [];
  const seen = new Map();
  // Sử dụng HashMap để lưu các chỉ số đã duyệt sau đó làm giảm độ phức tạp của thuật toán
  // Dùng hashmap các phần tử sẽ được duyệt một lần duy nhất
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) {
      result.push(seen.get(complement), i);
      // Lấy chỉ số đã lưu để bỏ vào kết quả
      //khi tìm thấy giá trị phù hợp để hai tử liên tiếp sum bằng target và ở đây thì ta lấy target trừ phần tử hiện tại nếu nó bằng phânn
    }
    //nếu chưa có trong hashmap thìthì
    // Lưu giá trị hiện tại và chỉ số vào hashmap
    seen.set(nums[i], i);
  }

  return result;
}

// Ví dụ
console.log(twoSum([2, 7, 11, 15], 9)); // Output: [[0, 1]]
console.log(twoSum([3, 2, 4, 3], 6)); // Output: [[1, 2], [0, 3]]
