describe('Central de Atendimento ao Cliente TAT', () => {

  let usersData;
  
  beforeEach(() => {
    cy.visit('./src/index.html');
    cy.fixture('users.json').then((data) => {
      usersData = data;
    });
  });

  it('verifica o título da aplicação', () => {
    cy.verifyTitle();
  });

  it('preenche os campos obrigatórios e envia o formulário.', () => {
    const user = usersData.success;

    cy.fillMandatoryFields(user);
    cy.clickSendButton();
    cy.shouldMessageSuccess();
  });

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida.', () => {
    const user = usersData.errorInvalidEmail;

    cy.fillMandatoryFields(user);
    cy.clickSendButton();
    cy.shouldMessageError();
  });

  it('campo telefone continua vazio quando preenchido com um valor não numérico.', () => {
    const user = usersData.errorInvalidPhone;

    cy.shouldPhoneFieldEmpty(user.phone);
  });

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    const user = usersData.errorMandatoryPhone;

    cy.fillMandatoryFields(user);
    cy.checkPhone();
    cy.clickSendButton();
    cy.shouldMessageError();
  });

  it('limpa os campos do formulário.', () => {
    const user = usersData.clearForm;

    cy.clearForm(user);
  });

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.', () => {
    cy.clickSendButton();
    cy.shouldMessageError();
  });

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.selectOptions({ select: '#product', options: 'youtube', type: 'text' });
  });

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.selectOptions({ select: '#product', options: 'mentoria', type: 'value' });
  });

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.selectOptions({ select: '#product', options: 1, type: 'index' });
  });

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.checkRadio('feedback');
  });

  it('marca cada tipo de atendimento', () => {
    cy.checkAllProducts();
  });

  it('desmarca o último tipo de atendimento adicionado', () => {
    cy.uncheckLastElement();
  });

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.uploadFile('cypress/fixtures/users.json');
  });


  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.checkRadioWitchAlias('users.json');
  });

  it('arrasta um arquivo simulando um drag-and-drop', () => {
    cy.dragFile('cypress/fixtures/users.json');
  });

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.checkPolicyLink();
  });

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.checkRemoveTarget();
  });
});