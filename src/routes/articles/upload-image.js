const upload = require('../../utils/setup-multer');
const fs = require('fs');
const path = require('path');

router.post(
  '/api/article/upload-image', 
  upload.single({ name: 'image', maxCount: 1 }),
  async (req, res) => {
    

  }
);