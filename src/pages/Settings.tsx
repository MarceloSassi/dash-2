import React, { useState } from 'react';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, Alert, Card, CardContent, Switch } from '@mui/material';
import { useBetStore } from '../store/useBetStore';
import { useBankStore } from '../store/useBankStore';
import { useTheme } from '../contexts/ThemeContext';
import { useProfileStore } from '../store/useProfileStore';

const Settings: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { clearBets } = useBetStore();
  const { clearTransactions } = useBankStore();
  const { isDarkMode, toggleTheme } = useTheme();
  const { avatar, setAvatar, clearAvatar } = useProfileStore();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClearData = () => {
    clearBets();
    clearTransactions();
    setOpen(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setAvatar(result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = () => {
    clearAvatar();
  };

  return (
    <Box sx={{ p: { xs: 1, sm: 3 } }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Configurações
      </Typography>

      <Card sx={{ mt: 4, mb: 3, backgroundColor: 'background.paper' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Tema
            </Typography>
            
            <Switch
              checked={isDarkMode}
              onChange={toggleTheme}
              color="primary"
              size="medium"
            />
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ mt: 3, mb: 3, backgroundColor: 'background.paper' }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Foto de Perfil
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {avatar ? (
              <Box
                component="img"
                src={avatar}
                alt="Avatar"
                sx={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover' }}
              />
            ) : (
              <Box
                sx={{ width: 64, height: 64, borderRadius: '50%', bgcolor: 'grey.300' }}
              />
            )}
            <Button variant="contained" component="label">
              {avatar ? 'Alterar' : 'Selecionar'}
              <input type="file" hidden accept="image/*" onChange={handleAvatarChange} />
            </Button>
            {avatar && (
              <Button color="error" onClick={handleRemoveAvatar}>
                Remover
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Gerenciamento de Dados
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Cuidado! As ações abaixo são irreversíveis.
          </Typography>
          <Button
            variant="contained"
            color="error"
            onClick={handleOpen}
            size="large"
            fullWidth
          >
            Limpar Todos os Dados
          </Button>
        </CardContent>
      </Card>

      {showSuccess && (
        <Alert severity="success" sx={{ mt: 2 }}>
          Todos os dados foram limpos com sucesso!
        </Alert>
      )}

      <Dialog 
        open={open} 
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            margin: { xs: 1, sm: 2 },
          }
        }}
      >
        <DialogTitle>Confirmar Limpeza de Dados</DialogTitle>
        <DialogContent>
          <Typography>
            Tem certeza que deseja limpar todos os dados? Esta ação não pode ser desfeita e irá:
          </Typography>
          <ul>
            <li>Remover todas as apostas</li>
            <li>Remover todas as transações bancárias</li>
            <li>Zerar todas as estatísticas</li>
          </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleClearData} color="error" variant="contained">
            Limpar Dados
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Settings; 