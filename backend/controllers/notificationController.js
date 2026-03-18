// @desc    Send push notification (Mock/Firebase placeholder)
// @route   POST /api/notifications/send
export const sendNotification = async (req, res) => {
  try {
    const { userId, title, message } = req.body;
    
    // In a production app, you would initialize firebase-admin here
    // and call admin.messaging().send(...)
    
    console.log(`[MOCK NOTIFICATION] To User ${userId}: ${title} - ${message}`);
    
    res.json({ 
      success: true, 
      message: 'Notification sent successfully (mocked)' 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
