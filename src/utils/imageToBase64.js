const imageToBase64 = async (url) => {
    const arrayBuffer = await fetch(url).then((res) => res.arrayBuffer());
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    const dataUrl = `url(data:image/jpeg;base64,${base64})`;
    return dataUrl;
}

module.exports = { imageToBase64 };
