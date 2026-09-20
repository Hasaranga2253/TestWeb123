const previewMap = {
  eyebrow: '[data-preview="eyebrow"]',
  title: '[data-preview="title"]',
  message: '[data-preview="message"]',
  primary_label: '[data-preview="primary_label"]',
  secondary_label: '[data-preview="secondary_label"]',
};

Object.entries(previewMap).forEach(([name, selector]) => {
  const field = document.querySelector(`[name="${name}"]`);
  const preview = document.querySelector(selector);

  if (!field || !preview) {
    return;
  }

  field.addEventListener('input', () => {
    preview.textContent = field.value || ' ';
  });
});

const imageInput = document.querySelector('[name="popup_image"]');
const existingImage = document.querySelector('[data-preview-image]');
const placeholder = document.querySelector('[data-preview-placeholder]');

if (imageInput) {
  imageInput.addEventListener('change', () => {
    const file = imageInput.files?.[0];

    if (!file || !file.type.startsWith('image/')) {
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    let image = existingImage;

    if (!image) {
      image = document.createElement('img');
      image.setAttribute('data-preview-image', '');
      placeholder?.replaceWith(image);
    }

    image.src = imageUrl;
    image.onload = () => URL.revokeObjectURL(imageUrl);
  });
}
