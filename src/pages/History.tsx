import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  Chip,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useBetStore } from '../store/useBetStore';
import { format } from 'date-fns';
import { Bet, BetStatus, Sport } from '../types/bet';

const History: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedSport, setSelectedSport] = useState<Sport | 'All'>('All');
  const [selectedStatus, setSelectedStatus] = useState<BetStatus | 'All'>('All');
  const [selectedBetType, setSelectedBetType] = useState<string>('All');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [betToDelete, setBetToDelete] = useState<string | null>(null);

  const allBets = useBetStore((state) => state.bets);
  const deleteBet = useBetStore((state) => state.deleteBet);
  const completedBets = allBets.filter((bet) => bet.status !== 'Pending');

  const handleSportChange = (event: SelectChangeEvent) => {
    setSelectedSport(event.target.value as Sport | 'All');
  };

  const handleStatusChange = (event: SelectChangeEvent) => {
    setSelectedStatus(event.target.value as BetStatus | 'All');
  };

  const handleBetTypeChange = (event: SelectChangeEvent) => {
    setSelectedBetType(event.target.value as string);
  };

  const handleOpenDeleteDialog = (betId: string) => {
    setBetToDelete(betId);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setBetToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (betToDelete) {
      deleteBet(betToDelete);
      handleCloseDeleteDialog();
    }
  };

  const filteredBets = completedBets.filter((bet) => {
    const dateMatch =
      (!startDate || bet.date >= startDate) &&
      (!endDate || bet.date <= endDate);
    const sportMatch = selectedSport === 'All' || bet.sport === selectedSport;
    const statusMatch = selectedStatus === 'All' || bet.status === selectedStatus;
    const betTypeMatch = selectedBetType === 'All' || bet.betType === selectedBetType;
    return dateMatch && sportMatch && statusMatch && betTypeMatch;
  });

  const getStatusColor = (status: BetStatus) => {
    switch (status) {
      case 'Won':
        return 'success';
      case 'Lost':
        return 'error';
      default:
        return 'default';
    }
  };

  const getSportLabel = (sport: Sport) => {
    switch (sport) {
      case 'Soccer':
        return 'Futebol';
      case 'Basketball':
        return 'Basquete';
      case 'Tennis':
        return 'Tênis';
      case 'Volleyball':
        return 'Vôlei';
      case 'Other':
        return 'Outro';
      default:
        return sport;
    }
  };

  return (
    <Box sx={{ p: { xs: 1, sm: 2 } }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Histórico de Apostas
      </Typography>
      <Typography variant="body1" gutterBottom>
        Histórico completo de todas as apostas.
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            flexWrap: 'wrap',
            gap: { xs: 1, sm: 2 },
            '& > *': {
              flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 4px)', md: '1 1 calc(25% - 4px)' }
            }
          }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Data Inicial"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                slotProps={{ textField: { fullWidth: true } }}
              />
              <DatePicker
                label="Data Final"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </LocalizationProvider>
            <FormControl fullWidth>
              <InputLabel>Esporte</InputLabel>
              <Select
                value={selectedSport}
                label="Esporte"
                onChange={handleSportChange}
              >
                <MenuItem value="All">Todos os Esportes</MenuItem>
                <MenuItem value="Soccer">Futebol</MenuItem>
                <MenuItem value="Basketball">Basquete</MenuItem>
                <MenuItem value="Tennis">Tênis</MenuItem>
                <MenuItem value="Volleyball">Vôlei</MenuItem>
                <MenuItem value="Other">Outro</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={selectedStatus}
                label="Status"
                onChange={handleStatusChange}
              >
                <MenuItem value="All">Todos</MenuItem>
                <MenuItem value="Won">Ganhou</MenuItem>
                <MenuItem value="Lost">Perdeu</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Tipo de Aposta</InputLabel>
              <Select
                value={selectedBetType}
                label="Tipo de Aposta"
                onChange={handleBetTypeChange}
              >
                <MenuItem value="All">Todos os Tipos</MenuItem>
                <MenuItem value="Resultado">Resultado</MenuItem>
                <MenuItem value="Gols">Gols</MenuItem>
                <MenuItem value="Handicap">Handicap</MenuItem>
                <MenuItem value="Escanteios">Escanteios</MenuItem>
                <MenuItem value="Cartões">Cartões</MenuItem>
                <MenuItem value="Jogadores">Jogadores</MenuItem>
                <MenuItem value="Por Tempo">Por Tempo</MenuItem>
                <MenuItem value="Especiais">Especiais</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </CardContent>
      </Card>

      <Paper sx={{ maxHeight: 'calc(100vh - 300px)', overflowY: 'auto', overflowX: 'hidden' }}>
        <List>
          {filteredBets.map((bet, index) => (
            <React.Fragment key={bet.id}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="subtitle1" component="span">
                        {bet.description}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Chip
                          label={bet.status === 'Won' ? 'Ganhou' : 'Perdeu'}
                          color={getStatusColor(bet.status)}
                          size="small"
                        />
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleOpenDeleteDialog(bet.id)}
                          title="Deletar aposta"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                        sx={{ display: 'block' }}
                      >
                        {format(bet.date, 'dd/MM/yyyy')} - {getSportLabel(bet.sport)}
                      </Typography>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                        sx={{ display: 'block' }}
                      >
                        Valor: R$ {bet.amount.toFixed(2)} | Odd: {bet.odd}
                      </Typography>
                      {bet.status === 'Won' && (
                        <Typography
                          component="span"
                          variant="body2"
                          color="success.main"
                          sx={{ display: 'block' }}
                        >
                          Ganho: R$ {(bet.amount * bet.odd - bet.amount).toFixed(2)}
                        </Typography>
                      )}
                    </React.Fragment>
                  }
                />
              </ListItem>
              {index < filteredBets.length - 1 && <Divider component="li" />}
            </React.Fragment>
          ))}
        </List>
      </Paper>

      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Confirmar exclusão
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tem certeza que deseja deletar esta aposta? Esta ação não pode ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancelar</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Deletar Permanentemente
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default History; 